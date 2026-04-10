# Skills Network execution guide

## 1. Clone your course repo
```bash
cd /home/project
git clone <your-github-repo-url>
cd <your-repo-name>
```

## 2. Upload and unzip this scaffold
Upload the zip into your repo folder from the Skills Network file panel.

```bash
cd /home/project/<your-repo-name>
unzip giftlink-sparkle-course11-adjusted.zip
```

## 3. Merge the scaffold into the repo root
```bash
cp -r giftlink-sparkle-course11/.github .
cp -r giftlink-sparkle-course11/giftlink-backend .
cp -r giftlink-sparkle-course11/giftlink-frontend .
cp -r giftlink-sparkle-course11/deployment .
cp giftlink-sparkle-course11/README.md .
cp giftlink-sparkle-course11/COURSE_ALIGNMENT.md .
cp giftlink-sparkle-course11/SKILLS_NETWORK_EXECUTION.md .
```

## 4. Create environment files
```bash
cp giftlink-backend/.env.sample giftlink-backend/.env
cp giftlink-frontend/.env.sample giftlink-frontend/.env
```

Edit them:
```bash
nano giftlink-backend/.env
nano giftlink-frontend/.env
```

Backend example values:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=GiftsDB
JWT_SECRET=replace-me
FRONTEND_URL=http://localhost:3000
```

Frontend example values:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

## 5. Install backend dependencies
```bash
cd /home/project/<your-repo-name>/giftlink-backend
npm install
```

## 6. Install frontend dependencies
Open a second terminal and run:
```bash
cd /home/project/<your-repo-name>/giftlink-frontend
npm install
```

## 7. Start the backend
```bash
cd /home/project/<your-repo-name>/giftlink-backend
npm start
```

## 8. Start the frontend
In a second terminal:
```bash
cd /home/project/<your-repo-name>/giftlink-frontend
npm start
```

## 9. Verify pages
Check these routes in the browser preview:
- `/`
- `/app`
- `/app/search`
- `/app/product/:id`
- `/app/login`
- `/app/register`
- `/app/profile`
- `/app/listings`

## 10. Verify API endpoints
Use the browser or curl:
```bash
curl http://localhost:5000/api/gifts
curl http://localhost:5000/api/search?q=lamp
curl http://localhost:5000/sentiment?text=lovely
```

## 11. Commit and push
```bash
cd /home/project/<your-repo-name>
git add .
git commit -m "Align GiftLink Sparkle scaffold to course 11 notes"
git push
```

## 12. Check GitHub Actions
Open GitHub → Actions and confirm the `CI/CD` workflow runs.

## 13. Optional Docker/Kubernetes
Deployment samples are included in:
- `giftlink-backend/Dockerfile`
- `giftlink-frontend/Dockerfile`
- `deployment/`
