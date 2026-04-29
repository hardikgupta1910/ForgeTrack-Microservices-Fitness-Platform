import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useCreateActivityMutation } from '../features/activities/activityApi'

const AddActivity = () => {
  const navigate = useNavigate()
  const [createActivity, { isLoading, error }] = useCreateActivityMutation()

  const [formData, setFormData] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    startTime: '',
  })

  const [metrics, setMetrics] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'type') {
      setMetrics({})
    }
  }

  const handleMetricChange = (name, value) => {
    setMetrics((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const buildAdditionalMetrics = () => {
    const result = {}

    Object.entries(metrics).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) return

      const numericKeys = [
        'distanceKm',
        'steps',
        'avgSpeed',
        'sets',
        'reps',
        'weightKg',
        'laps',
        'distanceMeters',
        'avgHeartRate',
        'maxHeartRate',
      ]

      result[key] = numericKeys.includes(key) ? Number(value) : value
    })

    return result
  }

  const renderMetricFields = () => {
    switch (formData.type) {
      case 'RUNNING':
      case 'WALKING':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              placeholder="Distance (km)"
              value={metrics.distanceKm || ''}
              onChange={(e) => handleMetricChange('distanceKm', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Steps"
              value={metrics.steps || ''}
              onChange={(e) => handleMetricChange('steps', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Pace (e.g. 5:20/km)"
              value={metrics.pace || ''}
              onChange={(e) => handleMetricChange('pace', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'CYCLING':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              placeholder="Distance (km)"
              value={metrics.distanceKm || ''}
              onChange={(e) => handleMetricChange('distanceKm', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Average speed (km/h)"
              value={metrics.avgSpeed || ''}
              onChange={(e) => handleMetricChange('avgSpeed', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Terrain"
              value={metrics.terrain || ''}
              onChange={(e) => handleMetricChange('terrain', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'WEIGHT_TRAINING':
        return (
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Exercise name"
              value={metrics.exerciseName || ''}
              onChange={(e) => handleMetricChange('exerciseName', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Sets"
              value={metrics.sets || ''}
              onChange={(e) => handleMetricChange('sets', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Reps"
              value={metrics.reps || ''}
              onChange={(e) => handleMetricChange('reps', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={metrics.weightKg || ''}
              onChange={(e) => handleMetricChange('weightKg', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'SWIMMING':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              placeholder="Laps"
              value={metrics.laps || ''}
              onChange={(e) => handleMetricChange('laps', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Stroke type"
              value={metrics.stroke || ''}
              onChange={(e) => handleMetricChange('stroke', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Distance (m)"
              value={metrics.distanceMeters || ''}
              onChange={(e) => handleMetricChange('distanceMeters', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'CARDIO':
      case 'HIIT':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              placeholder="Average heart rate"
              value={metrics.avgHeartRate || ''}
              onChange={(e) => handleMetricChange('avgHeartRate', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="number"
              placeholder="Max heart rate"
              value={metrics.maxHeartRate || ''}
              onChange={(e) => handleMetricChange('maxHeartRate', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Intensity"
              value={metrics.intensity || ''}
              onChange={(e) => handleMetricChange('intensity', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'YOGA':
      case 'STRETCHING':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Focus area"
              value={metrics.focusArea || ''}
              onChange={(e) => handleMetricChange('focusArea', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Difficulty"
              value={metrics.difficulty || ''}
              onChange={(e) => handleMetricChange('difficulty', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Mood / note"
              value={metrics.note || ''}
              onChange={(e) => handleMetricChange('note', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )

      case 'OTHER':
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Metric name"
              value={metrics.label || ''}
              onChange={(e) => handleMetricChange('label', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Metric value"
              value={metrics.value || ''}
              onChange={(e) => handleMetricChange('value', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>
        )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createActivity({
        type: formData.type,
        duration: Number(formData.duration),
        caloriesBurned: Number(formData.caloriesBurned),
        startTime: formData.startTime,
        additionalMetrics: buildAdditionalMetrics(),
      }).unwrap()

      navigate('/activities')
    } catch (err) {
      console.error('Create activity failed:', err)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-2xl font-bold text-white">Add Activity</h1>
        <p className="mt-2 text-sm text-slate-400">
          Log a new fitness activity for AI-based recommendations.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="RUNNING">RUNNING</option>
              <option value="WALKING">WALKING</option>
              <option value="CYCLING">CYCLING</option>
              <option value="WEIGHT_TRAINING">WEIGHT_TRAINING</option>
              <option value="CARDIO">CARDIO</option>
              <option value="SWIMMING">SWIMMING</option>
              <option value="HIIT">HIIT</option>
              <option value="YOGA">YOGA</option>
              <option value="STRETCHING">STRETCHING</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Duration</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Minutes"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Calories Burned</label>
            <input
              type="number"
              name="caloriesBurned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              placeholder="Calories"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Additional Metrics
            </label>
            <p className="mb-3 text-xs text-slate-400">
              Fields change automatically based on selected activity type.
            </p>
            {renderMetricFields()}
          </div>

          {error && (
            <p className="md:col-span-2 text-sm text-red-400">
              Failed to create activity.
            </p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Activity'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AddActivity