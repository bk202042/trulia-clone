# Trulia Clone API Documentation

This document outlines the available API endpoints and their usage.

## Properties API

### Get Properties List

```http
GET /api/properties
```

Query Parameters:
- `city` (optional): Filter by city name
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `propertyType` (optional): Type of property
- `limit` (optional, default: 10): Number of results per page
- `offset` (optional, default: 0): Offset for pagination

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "price": "number",
      // ... other property fields
    }
  ],
  "error": null,
  "metadata": {
    "page": "number",
    "limit": "number",
    "total": "number"
  }
}
```

### Get Property by ID

```http
GET /api/properties/{id}
```

Parameters:
- `id` (required): UUID of the property

Response:
```json
{
  "data": {
    "id": "uuid",
    "title": "string",
    "price": "number",
    // ... other property fields
  },
  "error": null
}
```

### Get Featured Properties

```http
GET /api/featured-properties
```

Query Parameters:
- `limit` (optional, default: 4, max: 10): Number of featured properties to return

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "price": "number",
      // ... other property fields
    }
  ],
  "error": null,
  "metadata": {
    "limit": "number"
  }
}
```

## Error Responses

All endpoints may return the following error response format:

```json
{
  "data": null,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object | undefined"
  }
}
```

Common Error Codes:
- `VALIDATION_ERROR` (400): Invalid input parameters
- `NOT_FOUND` (404): Resource not found
- `DATABASE_ERROR` (500): Database operation failed
- `INTERNAL_SERVER_ERROR` (500): Unexpected server error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address. Exceeding this limit will result in a 429 Too Many Requests response.
