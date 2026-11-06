# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (user chose the recommendation). Site languages: Turkish and English.

## Users

People inside companies that already run an internal AI assistant (or are about to) and have no systematic way to know whether it answers correctly. They reach the site as evaluators, not buyers in a hurry: curious, technically literate, skeptical of AI-quality claims. The job: decide whether this kind of evaluation and observability is something their own company should set up.

## Product Purpose

MINOS Evals tests an enterprise AI assistant from the outside, without access to its source code. Pre-written test scenarios are sent through the assistant's API; the answer and its tool calls are collected; code checks and an LLM judge score the result; humans only see what stayed uncertain. The site exists to make a visitor think "we should do evaluation and observability like this for our assistant." It is a showcase, not a conversion funnel.

## Positioning

The evaluation layer sits outside the assistant: no source code needed, no change to the assistant. Two properties a neighbor could not truthfully copy together: (1) the final pass / fail / needs_review verdict comes from a deterministic rule over per-metric judge results, not from an LLM's overall impression, and a case without critical evidence becomes needs_review rather than pass; (2) human labels are remembered and carried to later runs with the same answer.

## Operating Context

Flow: write cases (question, reference, criteria, required and forbidden tools; each edit makes a new immutable revision, bulk and spreadsheet upload exist) -> assemble a suite and run (choose target, model, judge, metric profile; one-off or scheduled) -> per-case verdict with metric cards, evidence and trace -> humans label only the Needs review queue -> labels carry to later runs -> runs are compared against a baseline. Console sections: Overview, Needs review, Runs, Compare, Traces, Cases, Suites, Metrics. Judge modes: off, suggest (judge proposes, human decides), auto. The assistant's answers are only sent to the customer's own models, enforced in code at run start and on every judge call.

## Capabilities and Constraints

- Deterministic code checks (tool policy: required and forbidden tools; latency; credit cost) and judge metrics (correctness, groundedness, language, completeness, instruction following).
- Unmeasurable metric is "unavailable" and excluded, never counted as a failure.
- Visibility into the target is more "gray box" than "black box": answer, latency, tool calls and token usage are visible; generated files are not. Do not claim "black box" as a technical term; the safe public phrase is "no source code required".
- Do not claim it tests "any LLM". Adding a new target system is a code change.
- Metric profile weights and the 0.7 pass threshold are provisional: do not publish numbers as final product facts.
- Access is staged (import of hand-collected answers, service API, deeper internal records); some access levels are blocked or pending on the customer side.
- Open: pricing, licensing, open-source status, deployment claims.

## Brand Commitments

- Name: MINOS Evals. Logo: Labrys (double-headed axe), colors black #1B1714 and red #8F2A22, never recolored; on dark backgrounds it sits on a white tile.
- Primary red #c8102e (dark mode #ff5f6d), tint #fdecee, zinc neutrals, Montserrat.
- Console tone is plain and technical; there is no written voice guide.
- Binding naming rule (user confirmed): the customer's and the assistant's real names must never appear on the site, in copy, examples or screenshots. Also avoid details that identify the industry or customer (specific tool or system names from the customer's setup, airline vocabulary).
- Site design decisions (painting hero, fully dark site, no product screenshots) live in `docs/superpowers/specs/2026-11-06-minos-evals-site-design.md`.

## Evidence on Hand

None publishable yet: no customer logos, testimonials, benchmarks or case studies, and none may be invented. The product's own mechanics (flow, verdicts) are real and are described in text. The only sample on the site is one short written case, labelled as a sample.

## Product Principles

1. Say only what the product demonstrably does; honesty over reach.
2. The verdict is rule-based and shows its evidence.
3. Humans spend time only where the machine is unsure.
4. The evaluator stays outside the system under test.
5. Customer data stays with the customer's own models.

## Accessibility & Inclusion

None specified. Default to WCAG AA.
