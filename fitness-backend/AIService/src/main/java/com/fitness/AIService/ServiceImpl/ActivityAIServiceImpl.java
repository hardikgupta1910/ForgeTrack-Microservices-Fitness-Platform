package com.fitness.AIService.ServiceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AIService.Service.ActivityAIService;
import com.fitness.AIService.dto.ActivityResponse;
import com.fitness.AIService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityAIServiceImpl implements ActivityAIService {

    private final OpenRouterService openRouterService;
    private final GroqService groqService;
    private final GeminiService geminiService;




@Override
public Recommendation generateRecommendations(ActivityResponse response) {

    String prompt = createPromptActivity(response);
    String aiResponse;

    try {
        aiResponse = openRouterService.generate(prompt);

        if (isInvalid(aiResponse)) throw new RuntimeException();

        log.info("OpenRouter SUCCESS");

    } catch (Exception e1) {

        log.warn("OpenRouter failed → Groq", e1);

        try {
            aiResponse = groqService.generate(prompt);
            if (isInvalid(aiResponse)) throw new RuntimeException();

            log.info("Groq SUCCESS");

        } catch (Exception e2) {

            log.warn("Groq failed → Gemini", e2);

            try {
                aiResponse = geminiService.generate(prompt);

                if (isInvalid(aiResponse)) throw new RuntimeException();

                log.info("Gemini SUCCESS");

            } catch (Exception e3) {
                log.error("All AI providers failed", e3);

               return createFallbackRecommendation(response);
            }
        }
   }

    return processAIResponse(response, aiResponse);
}

    private Recommendation createFallbackRecommendation(ActivityResponse activity) {

        return Recommendation.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .activityType(String.valueOf(activity.getType()))
                .analysis(Map.of(
                        "overall", "Fallback response",
                        "pace", "N/A",
                        "heartRate", "N/A",
                        "caloriesBurned", "N/A"
                ))
                .improvements(List.of(
                        Map.of("area", "Consistency", "recommendation", "Stay consistent")
                ))
                .suggestions(List.of(
                        Map.of("workout", "Cardio", "description", "Try light cardio")
                ))
                .safety(List.of("Stay hydrated"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private Recommendation processAIResponse(ActivityResponse activity, String aiResponse) {

        Recommendation rec = new Recommendation();

        //  Always set base fields (never lose data)
        rec.setActivityId(activity.getId());
        rec.setUserId(activity.getUserId());
        rec.setActivityType(String.valueOf(activity.getType()));
        rec.setCreatedAt(LocalDateTime.now());

        try {
            ObjectMapper mapper = new ObjectMapper();

            String cleaned = cleanAIResponse(aiResponse);

            log.info("Cleaned AI response: {}", cleaned);

            JsonNode root = mapper.readTree(cleaned);

            //  SAFE extraction (no crash ever)
            rec.setAnalysis(extractAnalysis(root.path("analysis")));

            //  improvements
            rec.setImprovements(extractImprovements(root.path("improvements")));


            //  suggestions
            rec.setSuggestions(extractSuggestions(root.path("suggestions")));

            // safety
            rec.setSafety(extractSafety(root.path("safety")));

            return rec;

        } catch (Exception e) {
            log.error("AI parsing failed. Raw response: {}", aiResponse, e);

            //  NEVER crash => return fallback response
            return createFallbackRecommendation(activity);
        }

    }

    private Map<String, String> extractAnalysis(JsonNode analysisNode) {

        Map<String, String> analysis = new HashMap<>();

        analysis.put("overall", analysisNode.path("overall").asText("N/A"));
        analysis.put("pace", analysisNode.path("pace").asText("N/A"));
        analysis.put("heartRate", analysisNode.path("heartRate").asText("N/A"));
        analysis.put("caloriesBurned", analysisNode.path("caloriesBurned").asText("N/A"));

        return analysis;
    }

    private List<Map<String, String>> extractImprovements(JsonNode improvementsNode) {

        List<Map<String, String>> improvements = new ArrayList<>();

        if (improvementsNode.isArray()) {
            improvementsNode.forEach(node -> {
                String area = node.path("area").asText("");
                String recommendation = node.path("recommendation").asText("");

                if (!area.isBlank() || !recommendation.isBlank()) {
                    Map<String, String> map = new HashMap<>();
                    map.put("area", area);
                    map.put("recommendation", recommendation);
                    improvements.add(map);
                }
            });
        }

        return improvements;
    }

    private List<Map<String, String>> extractSuggestions(JsonNode suggestionsNode) {

        List<Map<String, String>> suggestions = new ArrayList<>();

        if (suggestionsNode.isArray()) {
            suggestionsNode.forEach(node -> {
                String workout = node.path("workout").asText("");
                String description = node.path("description").asText("");

                if (!workout.isBlank() || !description.isBlank()) {
                    Map<String, String> map = new HashMap<>();
                    map.put("workout", workout);
                    map.put("description", description);
                    suggestions.add(map);
                }
            });
        }

        return suggestions;
    }

    private List<String> extractSafety(JsonNode safetyNode) {

        List<String> safety = new ArrayList<>();

        if (safetyNode.isArray()) {
            safetyNode.forEach(node -> {
                String val = node.asText("");
                if (!val.isBlank()) safety.add(val);
            });
        }

        return safety.isEmpty()
                ? List.of("Stay hydrated", "Warm up properly")
                : safety;
    }

    @Override
    public String chat(String question) {

        String prompt = createChatPrompt(question);

        try {
            String res = openRouterService.generate(prompt);

            if (isInvalid(res)) throw new RuntimeException("Invalid response");

            return extractText(res);

        } catch (Exception e1) {

            try {
                String res = groqService.generate(prompt);

                if (isInvalid(res)) throw new RuntimeException("Invalid response");

                return extractText(res);

            } catch (Exception e2) {

                try {
                    String res = geminiService.generate(prompt);

                    if (isInvalid(res)) throw new RuntimeException("Invalid response");

                    return extractText(res);

                } catch (Exception e3) {
                    return "AI is currently unavailable. Try again later.";
                }
            }
        }
    }

    private String extractText(String response) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);


            if (root.has("choices")) {
                return root.path("choices")
                        .get(0)
                        .path("message")
                        .path("content")
                        .asText();
            }

            if (root.has("candidates")) {
                return root.path("candidates")
                        .get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText();
            }

            if (root.has("analysis")) {
                return response; // already JSON
            }

            return response;

        } catch (Exception e) {
            return response;
        }
    }

    private String cleanAIResponse(String aiResponse) {

        if (aiResponse == null) return "{}";

        String cleaned = aiResponse.trim();

        //  remove markdown
        cleaned = cleaned.replace("```json", "")
                .replace("```", "")
                .trim();

        //  remove leading "json"
        if (cleaned.startsWith("json")) {
            cleaned = cleaned.substring(4).trim();
        }

        //  remove everything BEFORE first {
        int start = cleaned.indexOf("{");
        if (start != -1) {
            cleaned = cleaned.substring(start);
        }

        //  remove everything AFTER last }
        int end = cleaned.lastIndexOf("}");

        if (end != -1) {
            cleaned = cleaned.substring(0, end + 1);
        }

        return cleaned;
    }



    private boolean isInvalid(String response) {
        return response == null ||
                response.isBlank() ||
                response.equals("{}");
    }


    private String createPromptActivity(ActivityResponse response) {
        return String.format("""
Analyze the following fitness activity and generate a structured response in STRICT JSON format.

Activity Details:
- Type: %s
- Duration: %s minutes
- Calories Burned: %s
- Average Heart Rate: %s

Instructions:
1. Keep output concise but slightly detailed (not generic).
2. Make recommendations specific to the activity data.
3. Avoid generic advice like "stay hydrated" unless contextually relevant.
4. Provide actionable insights (what + how much + how often).
5. Keep JSON structure EXACTLY as given below.

Return ONLY valid JSON. No extra text.

Format:
{
  "analysis": {
    "overall": "...",
    "pace": "...",
    "heartRate": "...",
    "caloriesBurned": "..."
  },
  "improvements": [
    {
      "area": "...",
      "recommendation": "..."
    }
  ],
  "suggestions": [
    {
      "workout": "...",
      "description": "..."
    }
  ],
  "safety": [
    "..."
  ]
}
""",
                response.getType(),
                response.getDuration(),
                response.getCaloriesBurned(),
                response.getAdditionalMetrics()
        );
    }
    private String createChatPrompt(String question) {
        return String.format("""
You are a fitness and health assistant.

Rules:
You are a fitness and health assistant.

Rules:
- Answer in 3–5 short lines only.
- Give specific, actionable advice (include numbers when possible: reps, duration, frequency).
- Avoid generic statements like "stay consistent" or "eat healthy".
- Keep language simple and direct.
- If the question lacks details, ask one short follow-up question at the end.
- Return plain text only.
- Do NOT use markdown symbols like *, **, or bullet points.

Focus on practical guidance the user can apply immediately.

User question:
%s

""", question);
    }
}



