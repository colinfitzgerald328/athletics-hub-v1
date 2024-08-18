import { CohereClient, Cohere } from "cohere-ai";
const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
  clientName: "General",
});

export const returnEmbeddedSearchTerm = async (search_query: string) => {
    return await client.embed({
        texts: [search_query],
        model: "embed-english-v3.0",
        inputType: Cohere.EmbedInputType.SearchDocument,
        embeddingTypes: [Cohere.EmbeddingType.Float],
        truncate: Cohere.EmbedRequestTruncate.None,
    });
}

export const getChatCompletion = async (question: string) => {
  const response = await client.chat({
      message: question,
      promptTruncation: Cohere.ChatRequestPromptTruncation.Off,
      temperature: 0.3
  });
  return response.text
}

