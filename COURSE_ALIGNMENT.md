# Course alignment notes

This scaffold was adjusted to match the uploaded course notes as closely as possible.

## Clear requirements applied
- Keep the exact course folders `giftlink-backend` and `giftlink-frontend`.
- Use `models/db.js` for the MongoDB connection helper.
- Register gift routes in `app.js`.
- Provide a route to fetch all gifts and a route to fetch a gift by ID.
- Keep auth routes for register, login, and profile update.
- Keep a search route and a sentiment endpoint.
- Keep the frontend page/component structure shown in the course overview.
- Add `.github/workflows/main.yml` for the GitHub Actions lab.
- Add Docker/Kubernetes samples for the containerize-and-deploy module.

## Endpoint compatibility
Some uploaded notes show singular `/api/gift` while your later screenshot clearly shows plural `/api/gifts`.
To stay compatible with both references, the backend mounts **both**:
- `/api/gifts`
- `/api/gift`

The frontend uses the plural `/api/gifts` form by default.
