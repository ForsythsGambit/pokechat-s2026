# DR05 PokeChat 2026

## Makefile

Run these from the project root (where `Makefile` lives).

| Command | Description |
|--------|-------------|
| `make install` | Sources `.env` if it exists, installs Python dependencies (`backend/requirements.txt`), then runs `npm install`. |
| `make frontend` | Starts the React app in development mode (`npm start`). |
| `make backend` | Starts the Flask server (`python3 backend/chat.py`). |
| `make submit` | Builds a submission zip from **only files Git tracks** (excludes untracked items such as `node_modules` and `.env`). Requires `STUDENT_NAME` and `STUDENT_EMAIL`. |

**Submit example**

```bash
make submit STUDENT_NAME="Ada Lovelace" STUDENT_EMAIL="ada@example.edu"
```

This creates `pokechat-submit-<name>-<email>.zip` in the project root.

Copy `.env.example` to `.env` and set your Azure OpenAI values before running the backend.

## Author

* [Your Name Here]
* [Your UTA ID Number]
* [Your UTA Email]
* [Cats or Dogs?]

* [Video Submission URL -- make sure permissions are open]