UX-Bridge Agent Findings

Already Refactored Components:

- LoginForm.tsx, Pagination.tsx, SortBy.tsx, VariantSelector.tsx,
  OrderListItem.tsx
- Nav.tsx and all nav sub-components (CartNavItem, CloseButton, OpenButton,
  MobileMenu, SearchBar, UserMenu)
- ProductList.tsx, ProductElement.tsx, AvailabilityMessage.tsx
- ChannelSelect.tsx, DraftModeNotification.tsx, CategoryCollection.tsx,
  PaymentStatus.tsx
- Loader.tsx, Overlay.tsx, Cart page components

Files Still Using Tailwind (15 files to refactor):

1. src/app/[channel]/(main)/layout.tsx - Main page wrapper
2. src/app/[channel]/(main)/products/page.tsx - Products list page
3. src/app/[channel]/(main)/products/[slug]/page.tsx - Product detail (heaviest
   Tailwind usage)
4. src/app/[channel]/(main)/products/[slug]/AddButton.tsx - Add to cart button
5. src/app/[channel]/(main)/products/[slug]/not-found.tsx - 404 page
6. src/app/[channel]/(main)/products/loading.tsx - Loading state
7. src/app/[channel]/(main)/categories/[slug]/page.tsx - Category page
8. src/app/[channel]/(main)/collections/[slug]/page.tsx - Collection page
9. src/app/[channel]/(main)/search/page.tsx - Search page
10. src/app/[channel]/(main)/orders/page.tsx - Orders page
11. src/app/[channel]/(main)/login/page.tsx - Login page
12. src/app/[channel]/(main)/pages/[slug]/page.tsx - CMS pages
13. src/app/error.tsx - Error page
14. src/app/checkout/page.tsx - Checkout wrapper (not the module)
15. src/ui/components/Header.tsx - Suspense fallbacks

SCSS Files to Create:

- Layout.scss, ProductDetail.scss, AddButton.scss, NotFound.scss, Loading.scss,
  Error.scss, Checkout.scss, CmsPage.scss
