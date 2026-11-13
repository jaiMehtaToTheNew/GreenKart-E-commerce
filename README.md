# GreenKart E-commerce Practice Project

A browser-based grocery demo with neutral branding and no personal names or customer accounts. Data is illustrative; cart state is saved locally in the browser. No real payments, inventory, suppliers or deliveries are involved.

## Run

Run `npm start`, then open http://localhost:4173. The static application has no build or runtime package dependencies. Internet access is optional for Google Fonts; system fonts are the fallback.

## Features and acceptance criteria

| Requirement | Acceptance criteria | Automated coverage |
|---|---|---|
| Search | Case-insensitive product search; empty results displayed | Search test |
| Categories and sorting | Filter by produce category; sort prices or names | Manual |
| Add to cart | Add selected quantity; cart badge and totals update | Journey test |
| Quantity and removal | Integer quantities 1–99; remove items; clear empty cart | Journey and persistence tests |
| Cart persistence | Cart survives browser refresh | Persistence test |
| Promotion | FRESH10 applies 10%; invalid/empty codes show feedback | Journey test |
| Checkout | Country and terms required; total and confirmation shown | Journey test; manually check required-field errors |
| Order completion | Cart clears; simulated order displays destination and total | Journey test |

Prices are in INR. Discount is rounded to two decimals. Delivery is free. Promotion state lasts for the current page session; cart contents persist until removed or checked out. Product art uses self-contained emoji, whose appearance varies by platform.

## Automation

Playwright with JavaScript and a Page Object Model. Run `npm install`, `npx playwright install chromium`, then `npm test`. To test another deployment, set `BASE_URL`. View the HTML report with `npx playwright show-report`. Stable `data-testid` selectors identify products, cart rows, totals and checkout controls.

These tests are supplied as project source. See the delivery notes for whether browser execution was possible in the creation environment.

## Project scope

Functional, negative, regression, usability and UI checks across search, products, cart, promotions and checkout. Real payments, personal information, production inventory and supplier integrations are out of scope.

## Suggested project tooling

GitHub for source control, Jira for requirements and defects, and Confluence for knowledge transfer are proposed integrations only; none are connected. A retrieval assistant is a possible future extension and is not implemented.

## Defect workflow

Record a descriptive title, requirement, environment, reproduction steps, expected/actual results, severity, and evidence. Link to the affected test and retest after a fix. No actual defects or project tickets are claimed.

## Creation verification

JavaScript syntax checks and HTTP serving passed. In-app browser checks verified search, adding a product, the ₹120 → ₹108 FRESH10 discount, country selection, simulated order confirmation and cart clearing. Standalone Playwright execution was blocked before tests could run by macOS MachPort sandbox permission denial; no automated pass is claimed.

## SAM1-18 — Update Product Quantity

Select a whole-number quantity from 1 to 99 using the product or cart controls. The decrease button is disabled at 1 and increase at 99. Invalid direct entries show inline feedback and retain the previous quantity. Valid cart changes persist and recalculate item counts, line prices, discounts and order totals. Product selection changes apply when adding the product to the bag.

Run `npm run test:unit` for quantity validation and cart-calculation checks. `tests/quantity.spec.js` covers selection, invalid cart edits, limits and reload persistence in Playwright. The existing 1–99 range is retained pending confirmation of Jira acceptance criteria.
