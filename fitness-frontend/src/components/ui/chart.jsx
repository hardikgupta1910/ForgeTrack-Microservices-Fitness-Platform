"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={className}
        {...props}
      >
        <style>
          {Object.entries(config || {})
            .map(([key, value]) => {
              return `
                [data-chart=${chartId}] {
                  --color-${key}: ${value.color};
                }
              `
            })
            .join("\n")}
        </style>
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  hideLabel = false,
  formatter,
  labelFormatter,
}) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={`grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white shadow-xl ${className || ""}`}
    >
      {!hideLabel && payload[0]?.payload?.date && (
        <div className="font-medium text-slate-300">
          {labelFormatter
            ? labelFormatter(payload[0].payload.date)
            : payload[0].payload.date}
        </div>
      )}

      <div className="grid gap-1">
        {payload.map((item, index) => {
          const key = item.dataKey
          const itemConfig = config?.[key]

          return (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300">
                  {itemConfig?.label || item.name}
                </span>
              </div>
              <span className="font-medium text-white">
                {formatter ? formatter(item.value, item.name, item) : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({ payload }) {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div className="flex items-center justify-center gap-4 pt-3">
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-2 text-sm text-slate-300">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span>{config?.[item.dataKey]?.label || item.value}</span>
        </div>
      ))}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}