<!--
┌──────────────────────────────────────────────────────────────┐
│  HEAPTRACE DEVELOPER SKILLS                                  │
│  Copyright © 2026 Heaptrace Technology Private Limited        │
│                                                              │
│  CONFIDENTIAL — FOR AUTHORIZED CLIENTS ONLY                  │
│                                                              │
│  This skill file is the intellectual property of Heaptrace.  │
│  It is provided exclusively to licensed clients and their    │
│  development teams for internal use only.                    │
│                                                              │
│  You MAY:                                                    │
│  ✅ Use within your development team                         │
│  ✅ Customize and tune for your project                      │
│  ✅ Use with Claude Code, Cursor, or any AI coding tool      │
│                                                              │
│  You MAY NOT:                                                │
│  ❌ Redistribute, share, or publish publicly                 │
│  ❌ Sell, sublicense, or transfer to third parties            │
│  ❌ Remove or modify this copyright notice                   │
│  ❌ Commit to any public or shared repository                │
│                                                              │
│  Unauthorized use or distribution is prohibited.             │
│  Contact: support@heaptrace.com                              │
└──────────────────────────────────────────────────────────────┘
-->

---
name: contract-test
description: "Write contract tests between services using Pact or schema validation to ensure API compatibility. Covers consumer-driven contracts, provider verification, schema evolution strategies, breaking change detection, and integration with CI/CD. Prevents integration failures before deployment."
---

# Contract Testing — Catch Breaking Changes Before Production

Takes a set of service dependencies (frontend-to-backend, service-to-service, or service-to-third-party) and sets up contract tests that detect API breaking changes before they reach production. Covers consumer-driven contracts with Pact, schema validation with Zod/JSON Schema, and OpenAPI contract verification.

---

## ⛔ Common Rules — Read Before Every Task

```
┌──────────────────────────────────────────────────────────────┐
│              MANDATORY RULES FOR EVERY TASK                  │
│                                                              │
│  You are a senior software engineer working on a product.    │
│  You are expert in database design, APIs, and building       │
│  full-stack applications. Follow these rules strictly.       │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│                                                              │
│  1. UNDERSTAND BEFORE YOU BUILD                              │
│     → Study the existing architecture first                  │
│     → Read how similar features are already built            │
│     → Identify existing patterns, services, and utilities    │
│     → Never assume — look at the actual codebase             │
│                                                              │
│  2. REUSE — NEVER DUPLICATE                                  │
│     → Search for existing components, functions, utilities   │
│     → If something similar exists, extend it — don't copy it │
│     → Shared logic goes in shared files, not repeated        │
│     → Ask: "Does this already exist somewhere?"              │
│                                                              │
│  3. USE EXISTING TECHNOLOGY                                  │
│     → Use the frameworks and libraries already in the project│
│     → Don't introduce a new library if an existing one works │
│     → Follow the project's established patterns              │
│                                                              │
│  4. ASK BEFORE ADDING ANYTHING NEW                           │
│     → New npm package? → ASK first                           │
│     → New framework or tool? → ASK first                     │
│     → New database table pattern? → ASK first                │
│     → New folder structure? → ASK first                      │
│     → Never install or download without confirmation         │
│                                                              │
│  5. FOLLOW BEST PRACTICES                                    │
│     → Clean, readable code over clever code                  │
│     → Proper error handling on every path                    │
│     → Input validation at every boundary                     │
│     → Consistent naming conventions throughout               │
│     → Small, focused functions over large ones               │
│                                                              │
│  6. NO AI TOOL REFERENCES — ANYWHERE                         │
│     → No "Generated by..." in code comments                  │
│     → No "Co-Authored-By: Claude/Cursor/Copilot" in commits │
│     → No AI tool mentions in PR descriptions                 │
│     → No AI watermarks in any output                         │
│     → All output must look 100% human-written                │
└──────────────────────────────────────────────────────────────┘
```

---

## When to Use This Skill

| Scenario | Use? |
|----------|------|
| Frontend depends on a backend API you own | Yes |
| Two microservices communicate via REST/gRPC | Yes |
| Your app integrates with a third-party API (Stripe, SendGrid) | Yes — validate their responses |
| Monolith with internal function calls | No — use unit/integration tests |
| Service communicates via message queue (Kafka, SQS) | Yes — message format is a contract |
| You have an OpenAPI spec but no tests validating it | Yes — OpenAPI validation |
| Breaking changes have caused production incidents | Yes — contract tests prevent this |

---

## What is a Contract Test?

```
┌──────────────────────────────────────────────────────────────┐
│  CONTRACT TEST = an agreement between two services about     │
│  the shape and behavior of their API communication.          │
│                                                              │
│  Consumer: "I will send you this request shape and expect    │
│            this response shape."                             │
│                                                              │
│  Provider: "I will always return data matching that shape    │
│            for that request."                                │
│                                                              │
│  The CONTRACT is the documented agreement between them.      │
│  The CONTRACT TEST verifies both sides still honor it.       │
│                                                              │
│  ┌──────────┐       Contract        ┌──────────┐            │
│  │ Consumer │ ◄───────────────────▶ │ Provider │            │
│  │ (Frontend│   "GET /api/courses    │ (Backend)│            │
│  │  or svc) │    returns Course[]"   │          │            │
│  └──────────┘                       └──────────┘            │
│       │                                    │                 │
│       ▼                                    ▼                 │
│  Consumer Test:                      Provider Test:          │
│  "When I call GET /courses,          "When someone calls     │
│   I expect an array of objects        GET /courses, I return │
│   with id, title, status fields"      objects with id, title,│
│                                       status fields"         │
└──────────────────────────────────────────────────────────────┘
```

---

## Approach Comparison

```
┌────────────────┬───────────────────┬───────────────────┬──────────────────┐
│  Approach      │  Tool             │  Best For         │  Complexity      │
├────────────────┼───────────────────┼───────────────────┼──────────────────┤
│  Consumer-     │  Pact             │  Microservices    │  High — needs    │
│  Driven        │                   │  with multiple    │  broker, both    │
│  Contracts     │                   │  consumers        │  sides write     │
│                │                   │                   │  tests           │
├────────────────┼───────────────────┼───────────────────┼──────────────────┤
│  Schema        │  Zod, Joi,        │  Frontend-backend │  Low — just      │
│  Validation    │  JSON Schema      │  in same repo     │  validate        │
│                │                   │  (monorepo)       │  response shape  │
├────────────────┼───────────────────┼───────────────────┼──────────────────┤
│  OpenAPI       │  Prism, Dredd,    │  API-first teams  │  Medium — need   │
│  Contract      │  Schemathesis     │  with OpenAPI     │  up-to-date      │
│  Validation    │                   │  spec             │  spec file       │
├────────────────┼───────────────────┼───────────────────┼──────────────────┤
│  Snapshot      │  Jest snapshots   │  Quick "did it    │  Very Low —      │
│  Contract      │                   │  change?" check   │  but fragile     │
└────────────────┴───────────────────┴───────────────────┴──────────────────┘
```

### Decision Tree

```
┌────────────────────────────────────┐
│  How many services consume        │
│  this API?                         │
├──────────┬─────────────────────────┤
│  1       │  2+                     │
│  ▼       │  ▼                      │
│ ┌────────────────┐ ┌────────────┐  │
│ │ Same repo?     │ │ Use Pact   │  │
│ ├──────┬─────────┤ │ (consumer  │  │
│ │ Yes  │   No    │ │  driven)   │  │
│ │ ▼    │   ▼     │ └────────────┘  │
│ │Schema│ Schema  │                 │
│ │valid-│ valid + │                 │
│ │ation │ Pact    │                 │
│ └──────┴─────────┘                 │
└────────────────────────────────────┘
```

---

## Approach 1 — Schema Validation Contracts (Recommended Start)

The simplest and most practical approach for monorepos and teams just starting with contracts.

### Shared Schema Definition

```typescript
// src/shared/contracts/courses.ts
// This file is the SINGLE SOURCE OF TRUTH for the Course API contract
import { z } from 'zod'

// ─── Response Schemas ──────────────────────────────────────
export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string().nullable(),
  thumbnail_url: z.string().url().nullable(),
  sections_count: z.number().int().min(0),
  enrolled_count: z.number().int().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
})

export const CourseListResponseSchema = z.object({
  items: z.array(CourseSchema),
  total: z.number().int().min(0),
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),
  totalPages: z.number().int().min(0),
})

// ─── Request Schemas ───────────────────────────────────────
export const CreateCourseRequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  category: z.string().max(100).optional(),
  tags: z.array(z.string()).max(10).optional(),
})

export const UpdateCourseRequestSchema = CreateCourseRequestSchema.partial()

// ─── TypeScript Types (derived from schemas) ───────────────
export type Course = z.infer<typeof CourseSchema>
export type CourseListResponse = z.infer<typeof CourseListResponseSchema>
export type CreateCourseRequest = z.infer<typeof CreateCourseRequestSchema>
```

### Consumer-Side Contract Test (Frontend)

```typescript
// src/frontend/tests/contracts/courses.contract.test.ts
import { CourseListResponseSchema, CourseSchema } from '@shared/contracts/courses'

describe('Course API Contract — Consumer Side', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3001'

  describe('GET /api/courses', () => {
    it('response matches the CourseListResponse contract', async () => {
      const response = await fetch(`${API_URL}/api/courses?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${testToken}` },
      })

      expect(response.status).toBe(200)

      const body = await response.json()

      // This is the contract test — validate the response shape
      const result = CourseListResponseSchema.safeParse(body)

      if (!result.success) {
        // Show exactly which fields violated the contract
        console.error('Contract violation:', result.error.format())
      }

      expect(result.success).toBe(true)
    })

    it('each course item matches the Course contract', async () => {
      const response = await fetch(`${API_URL}/api/courses?page=1&limit=5`, {
        headers: { Authorization: `Bearer ${testToken}` },
      })

      const body = await response.json()

      // Validate each individual course
      for (const course of body.items) {
        const result = CourseSchema.safeParse(course)
        if (!result.success) {
          console.error(`Course ${course.id} violates contract:`, result.error.format())
        }
        expect(result.success).toBe(true)
      }
    })
  })

  describe('GET /api/courses/:id', () => {
    it('returns a single course matching the Course contract', async () => {
      const response = await fetch(`${API_URL}/api/courses/${testCourseId}`, {
        headers: { Authorization: `Bearer ${testToken}` },
      })

      expect(response.status).toBe(200)

      const body = await response.json()
      const result = CourseSchema.safeParse(body)

      expect(result.success).toBe(true)
    })

    it('returns 404 with error contract for non-existent course', async () => {
      const response = await fetch(`${API_URL}/api/courses/nonexistent-id`, {
        headers: { Authorization: `Bearer ${testToken}` },
      })

      expect(response.status).toBe(404)

      const body = await response.json()
      expect(body).toHaveProperty('error')
      expect(typeof body.error).toBe('string')
    })
  })
})
```

### Provider-Side Contract Test (Backend)

```typescript
// src/backend/tests/contracts/courses.contract.test.ts
import request from 'supertest'
import { app } from '../../app'
import { CourseListResponseSchema, CourseSchema } from '@shared/contracts/courses'

describe('Course API Contract — Provider Side', () => {
  let authToken: string

  beforeAll(async () => {
    authToken = await getTestAuthToken()
    await seedTestCourses()
  })

  afterAll(async () => {
    await cleanupTestCourses()
  })

  describe('GET /api/courses', () => {
    it('response matches CourseListResponse contract', async () => {
      const response = await request(app)
        .get('/api/courses')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      const result = CourseListResponseSchema.safeParse(response.body)

      if (!result.success) {
        // Log detailed field-level violations
        const errors = result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
          received: i.code,
        }))
        console.error('Contract violations:', errors)
      }

      expect(result.success).toBe(true)
    })
  })

  describe('POST /api/courses', () => {
    it('created course matches Course contract', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Contract Test Course' })
        .expect(201)

      const result = CourseSchema.safeParse(response.body)
      expect(result.success).toBe(true)
    })

    it('rejects invalid request body per contract', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: '' })  // Empty title violates min(1)
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })
  })
})
```

---

## Approach 2 — Consumer-Driven Contracts with Pact

### Pact Flow

```
┌───────────────────────────────────────────────────────────────────┐
│                     PACT WORKFLOW                                 │
│                                                                   │
│  CONSUMER SIDE:                                                   │
│  ┌──────────┐   Generates    ┌──────────┐   Publishes    ┌─────┐│
│  │ Consumer │ ─────────────▶ │  Pact    │ ────────────▶  │Pact ││
│  │ Test     │                │  File    │                │Broker││
│  │          │                │ (JSON)   │                │     ││
│  └──────────┘                └──────────┘                └──┬──┘│
│                                                              │    │
│  PROVIDER SIDE:                                              │    │
│  ┌──────────┐   Downloads    ┌──────────┐                   │    │
│  │ Provider │ ◄──────────────│  Pact    │ ◄─────────────────┘    │
│  │ Verifies │                │  File    │                        │
│  │ against  │                │          │                        │
│  │ real API │                └──────────┘                        │
│  └──────────┘                                                    │
│       │                                                          │
│       ▼                                                          │
│  ┌──────────┐                                                    │
│  │ Pass/Fail│ → Reports back to broker → Blocks/allows deploy    │
│  └──────────┘                                                    │
└───────────────────────────────────────────────────────────────────┘
```

### Consumer Test (Pact)

```typescript
// src/frontend/tests/pact/course-consumer.pact.test.ts
import { PactV4, MatchersV3 } from '@pact-foundation/pact'
import { CourseApiClient } from '../../api/courses'

const { like, eachLike, uuid, iso8601DateTimeWithMillis, integer } = MatchersV3

const provider = new PactV4({
  consumer: 'lms-frontend',
  provider: 'lms-backend',
  logLevel: 'warn',
})

describe('Course API Consumer Pact', () => {
  describe('GET /api/courses', () => {
    it('returns a list of courses', async () => {
      await provider
        .addInteraction()
        .given('courses exist')
        .uponReceiving('a request for courses')
        .withRequest('GET', '/api/courses', (builder) => {
          builder.query({ page: '1', limit: '20' })
          builder.headers({ Authorization: like('Bearer token123') })
        })
        .willRespondWith(200, (builder) => {
          builder.headers({ 'Content-Type': 'application/json' })
          builder.jsonBody({
            items: eachLike({
              id: uuid(),
              title: like('Introduction to Testing'),
              description: like('Learn testing fundamentals'),
              status: like('published'),
              category: like('Engineering'),
              sections_count: integer(5),
              enrolled_count: integer(12),
              created_at: iso8601DateTimeWithMillis(),
              updated_at: iso8601DateTimeWithMillis(),
            }),
            total: integer(47),
            page: integer(1),
            limit: integer(20),
            totalPages: integer(3),
          })
        })
        .executeTest(async (mockServer) => {
          const client = new CourseApiClient(mockServer.url)
          const result = await client.listCourses({ page: 1, limit: 20 })

          expect(result.items).toHaveLength(1)  // Pact returns 1 for eachLike
          expect(result.items[0]).toHaveProperty('id')
          expect(result.items[0]).toHaveProperty('title')
          expect(result.items[0]).toHaveProperty('status')
          expect(result.total).toBe(47)
        })
    })
  })

  describe('POST /api/courses', () => {
    it('creates a new course', async () => {
      await provider
        .addInteraction()
        .given('user is authenticated as admin')
        .uponReceiving('a request to create a course')
        .withRequest('POST', '/api/courses', (builder) => {
          builder.headers({
            'Content-Type': 'application/json',
            Authorization: like('Bearer token123'),
          })
          builder.jsonBody({
            title: like('New Course'),
            description: like('Course description'),
          })
        })
        .willRespondWith(201, (builder) => {
          builder.jsonBody({
            id: uuid(),
            title: like('New Course'),
            status: like('draft'),
            created_at: iso8601DateTimeWithMillis(),
          })
        })
        .executeTest(async (mockServer) => {
          const client = new CourseApiClient(mockServer.url)
          const course = await client.createCourse({
            title: 'New Course',
            description: 'Course description',
          })

          expect(course.id).toBeDefined()
          expect(course.status).toBe('draft')
        })
    })
  })
})
```

### Provider Verification (Pact)

```typescript
// src/backend/tests/pact/course-provider.pact.test.ts
import { Verifier } from '@pact-foundation/pact'
import { app } from '../../app'

describe('Course API Provider Pact Verification', () => {
  let server: any

  beforeAll(async () => {
    // Start the real backend server
    server = app.listen(3333)
    // Seed required test data
    await seedTestData()
  })

  afterAll(async () => {
    server.close()
    await cleanupTestData()
  })

  it('verifies the provider against consumer contracts', async () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:3333',
      // Pact files from broker or local directory
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      provider: 'lms-backend',
      // OR local pact files:
      // pactUrls: ['./pacts/lms-frontend-lms-backend.json'],

      // State handlers — set up data for each test scenario
      stateHandlers: {
        'courses exist': async () => {
          await seedPublishedCourses(5)
        },
        'user is authenticated as admin': async () => {
          // Auth is handled by middleware, but ensure test user exists
          await ensureTestAdminExists()
        },
        'course with id exists': async (params) => {
          await seedSpecificCourse(params?.courseId)
        },
      },

      // Request filters — add auth headers that Pact doesn't have
      requestFilter: (req, res, next) => {
        req.headers.authorization = `Bearer ${getTestAdminToken()}`
        next()
      },

      // Publish results back to broker
      publishVerificationResult: process.env.CI === 'true',
      providerVersion: process.env.GITHUB_SHA || 'local',
    })

    await verifier.verifyProvider()
  })
})
```

---

## Breaking Change Detection

### What Counts as a Breaking Change

```
┌──────────────────────────────────────────────────────────────┐
│  BREAKING CHANGES (will fail contract tests):                │
│                                                              │
│  ❌ Removing a required field from a response                │
│     { id, title, status } → { id, title }  (status removed) │
│                                                              │
│  ❌ Changing a field's type                                   │
│     { count: 5 } → { count: "5" }  (number → string)        │
│                                                              │
│  ❌ Renaming a field                                          │
│     { created_at: "..." } → { createdAt: "..." }            │
│                                                              │
│  ❌ Changing enum values                                      │
│     status: "draft"|"published" → "pending"|"live"           │
│                                                              │
│  ❌ Making an optional field required in requests             │
│     { title: string, desc?: string } → { title, desc }      │
│                                                              │
│  ❌ Changing the response status code                         │
│     201 Created → 200 OK (consumers may check status)        │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  NON-BREAKING CHANGES (contract tests still pass):           │
│                                                              │
│  ✅ Adding a new OPTIONAL field to a response                │
│     { id, title } → { id, title, tags: [] }                 │
│                                                              │
│  ✅ Adding a new endpoint                                    │
│     POST /api/courses/bulk-enroll (new, consumers don't use) │
│                                                              │
│  ✅ Making a required request field optional                  │
│     { title, desc } → { title, desc? }                      │
│                                                              │
│  ✅ Adding a new enum value                                   │
│     status: "draft"|"published" → "draft"|"published"|"archived"│
│     (IF consumers handle unknown values gracefully)          │
└──────────────────────────────────────────────────────────────┘
```

### Automated Breaking Change Detection Script

```typescript
// scripts/check-api-compatibility.ts
import { z } from 'zod'
import fs from 'fs'

interface SchemaVersion {
  version: string
  schema: z.ZodType
  timestamp: string
}

function checkBackwardCompatibility(
  oldSchema: z.ZodType,
  newSchema: z.ZodType,
  sampleData: unknown[]
): { compatible: boolean; failures: string[] } {
  const failures: string[] = []

  for (const data of sampleData) {
    // If old schema accepts this data, new schema must too
    const oldResult = oldSchema.safeParse(data)
    const newResult = newSchema.safeParse(data)

    if (oldResult.success && !newResult.success) {
      failures.push(
        `Breaking: Data valid under old schema is rejected by new schema: ${
          newResult.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')
        }`
      )
    }
  }

  return {
    compatible: failures.length === 0,
    failures,
  }
}
```

---

## Schema Evolution Strategy

```
┌──────────────────────────────────────────────────────────────┐
│  SCHEMA EVOLUTION RULES                                      │
│                                                              │
│  1. ADDITIVE CHANGES ONLY (backward compatible)              │
│     → Add new optional fields                                │
│     → Add new endpoints                                      │
│     → Add new enum values (if consumers are tolerant)        │
│                                                              │
│  2. FOR BREAKING CHANGES, VERSION THE API                    │
│     → /api/v1/courses (old consumers keep working)           │
│     → /api/v2/courses (new shape for new consumers)          │
│     → Run both versions in parallel during migration         │
│     → Deprecate v1 after all consumers migrate               │
│                                                              │
│  3. DEPRECATION WORKFLOW                                     │
│     → Week 1: Add deprecation header to v1 responses         │
│     → Week 2-4: Migrate all consumers to v2                  │
│     → Week 5: Remove v1 endpoint                             │
│     → Contract tests on v2 must pass before removing v1      │
│                                                              │
│  4. USE TOLERANT READER PATTERN                              │
│     → Consumers IGNORE unknown fields (don't fail on extras) │
│     → Consumers validate only the fields they USE            │
│     → Use Zod .passthrough() or .strip() for tolerance       │
└──────────────────────────────────────────────────────────────┘
```

### Tolerant Reader Pattern

```typescript
// Consumer schema — only validates what this consumer actually needs
const CourseForCatalog = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  thumbnail_url: z.string().nullable(),
}).passthrough()  // ← IMPORTANT: ignore extra fields

// If the provider adds new fields (tags, difficulty_level, etc.),
// this consumer test still passes because .passthrough() ignores them.
```

---

## CI Integration for Contract Tests

```yaml
# .github/workflows/contract-tests.yml
name: Contract Tests

on:
  pull_request:
    paths:
      - 'src/shared/contracts/**'
      - 'src/backend/src/controllers/**'
      - 'src/backend/src/routes/**'
      - 'src/frontend/src/api/**'

jobs:
  consumer-contracts:
    name: Consumer Contract Tests
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: cd src/frontend && npm ci
      - run: cd src/frontend && npm run test:contracts
      # Pact: publish contract to broker
      - name: Publish Pact
        if: github.event_name == 'push'
        run: |
          cd src/frontend && npx pact-broker publish ./pacts \
            --consumer-app-version=${{ github.sha }} \
            --broker-base-url=${{ secrets.PACT_BROKER_URL }} \
            --broker-token=${{ secrets.PACT_BROKER_TOKEN }}

  provider-contracts:
    name: Provider Contract Verification
    runs-on: ubuntu-latest
    timeout-minutes: 10
    needs: [consumer-contracts]
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: cd src/backend && npm ci
      - run: cd src/backend && npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
      - run: cd src/backend && npm run test:contracts
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}

  schema-compatibility:
    name: Schema Compatibility Check
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Check for breaking schema changes
        run: |
          # Compare contract schemas between PR branch and main
          git diff origin/main...HEAD -- src/shared/contracts/ > /tmp/contract-diff.txt
          if [ -s /tmp/contract-diff.txt ]; then
            echo "Contract schemas changed — running compatibility check"
            cd src/shared && npx tsx scripts/check-compatibility.ts
          else
            echo "No contract changes detected"
          fi
```

---

## Common Mistakes / Anti-Patterns

```
┌──────────────────────────────────────────────────────────────┐
│  ANTI-PATTERN                    │  DO THIS INSTEAD          │
├──────────────────────────────────┼───────────────────────────┤
│  Testing against live production │  Test against local/CI    │
│  API                             │  instance                 │
│                                  │                           │
│  Consumer tests validate ALL     │  Validate only the fields │
│  fields including unused ones    │  this consumer uses       │
│                                  │                           │
│  Strict schema (no extra fields) │  Use .passthrough() or    │
│  on consumer side                │  tolerant reader pattern  │
│                                  │                           │
│  No versioning — just change API │  Version the API for      │
│  and hope consumers update       │  breaking changes         │
│                                  │                           │
│  Contract tests run only locally │  Run in CI, block merges  │
│                                  │  on contract violations   │
│                                  │                           │
│  Mock the provider in contract   │  Test against real provider│
│  verification tests              │  code, not mocks          │
│                                  │                           │
│  One giant contract file for     │  Separate contract per    │
│  all endpoints                   │  endpoint group           │
│                                  │                           │
│  Shared schemas drift from       │  Single source of truth   │
│  actual implementation           │  in shared/ directory     │
│                                  │                           │
│  Testing only 200 responses      │  Test 400, 404, 500, 401  │
│                                  │  error response shapes    │
│                                  │                           │
│  Forgetting message contracts    │  Test event/queue message │
│  (only HTTP)                     │  shapes too               │
└──────────────────────────────────┴───────────────────────────┘
```

---

## Tips for Best Results

1. **Start with schema validation** (Zod) — it's the simplest approach and gives 80% of the value with 20% of the effort
2. **Shared contracts live in a shared directory** — `/src/shared/contracts/` in a monorepo, or a shared npm package in a polyrepo
3. **Both sides must test** — consumer tests verify expectations, provider tests verify fulfillment. One without the other is incomplete
4. **Test error responses too** — the shape of a 404 or 400 response is part of the contract
5. **Use Zod schemas for runtime validation AND TypeScript types** — `z.infer<typeof Schema>` gives you types for free
6. **Run contract tests on every PR that touches API code** — use path-based CI filters
7. **The tolerant reader pattern prevents most false failures** — consumers should ignore unknown fields
8. **Version your API when making breaking changes** — never remove or rename a field in place
9. **Contract tests replace the need for E2E tests between services** — they're faster, more stable, and more focused
10. **If mocks exist in your test suite, validate them against contracts** — a mock that returns the wrong shape is worse than no mock
