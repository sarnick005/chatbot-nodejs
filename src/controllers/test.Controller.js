import { ApiErrors, ApiResponse, asyncHandler } from "../utils/index.js";
import axios from "axios";

const FASTAPI_URL = process.env.FASTAPI_URL;

const getResponse = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json(
        new ApiErrors(
          400,
          "Invalid request",
          "Prompt is required and must be a string",
        ),
      );
  }

  if (!FASTAPI_URL) {
    return res
      .status(500)
      .json(
        new ApiErrors(
          500,
          "Server configuration error",
          "FastAPI URL is not configured",
        ),
      );
  }

  try {
    const responseFromChatbot = await axios.post(`${FASTAPI_URL}/chat`, {
      user_input: prompt.trim(),
    });

    const { response, confidence, intent_tag } = responseFromChatbot.data;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { response, confidence, intent_tag },
          "Response received successfully",
        ),
      );
  } catch (error) {
    console.error("Error fetching response from chatbot:", error);

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message || "Failed to get response from chatbot";

    return res
      .status(statusCode)
      .json(new ApiErrors(statusCode, errorMessage, error.message));
  }
});

export { getResponse };
