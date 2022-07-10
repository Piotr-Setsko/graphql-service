1. Copy and rename env.example to .env
2. If needed apply changes in .env file. Each .env file have _PORT_ variable (by default it's 3000)
3. You can install node modules by:
  npm i
4. To run server:
```bash
 # server prod mode
  npm run start

 # server watch+debug
   npm run start:dev
   ```
5. After get jwt token, copy and past it in Apollo Studio - "Headers": "Authorization" - "Bearer 'actual.jwt.token'" 