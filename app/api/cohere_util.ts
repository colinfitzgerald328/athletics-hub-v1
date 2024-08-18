import { CohereClient, Cohere } from "cohere-ai";
const client = new CohereClient({
  token: "9KmzyG5gpHV1d4KT9OEv7N0pHyUmMu8l0xeRxmPl",
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

