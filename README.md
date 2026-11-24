# To-Do App

Полноценное To-Do приложение: FastAPI + PostgreSQL на бэкенде, ванильный JS на фронтенде.

## Стек

- **Backend:** FastAPI, SQLAlchemy 2, PostgreSQL, Pydantic
- **Frontend:** HTML, CSS, JavaScript (fetch API)
- **Документация API:** Swagger UI (`/docs`)

## Возможности

- Создание, просмотр, удаление задач
- Отметка задачи как выполненной
- Сохранение данных в PostgreSQL
- Автогенерируемая Swagger-документация

## Требования

- Python 3.11+
- PostgreSQL 14+

## Локальный запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/AKamzolov/To_Do.git
cd To_Do
```

### 2. Создать базу данных PostgreSQL

```sql
CREATE DATABASE todo_db;
```

### 3. Настроить бэкенд

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/macOS

pip install -r requirements.txt
```

### 4. Настроить переменные окружения

Скопируй `.env.example` в `.env` и подставь свои данные:

```bash
copy .env.example .env         # Windows
# cp .env.example .env         # Linux/macOS
```

Отредактируй `.env`:
```ini
DATABASE_URL=postgresql+psycopg2://postgres:ТВОЙ_ПАРОЛЬ@localhost:5432/todo_db
```

### 5. Запустить бэкенд

```bash
uvicorn main:app --reload
```

API доступен на `http://127.0.0.1:8000`, документация — на `/docs`.

### 6. Открыть фронтенд

Открой `frontend/index.html` в браузере (или через Live Server в VS Code).

## Структура проекта

```
To_Do/
├── backend/
│   ├── main.py          # FastAPI-приложение и эндпоинты
│   ├── models.py        # SQLAlchemy-модели
│   ├── database.py      # Подключение к PostgreSQL
│   ├── requirements.txt
│   ├── .env.example     # Шаблон переменных окружения
│   └── .env             # Локальные секреты (в .gitignore)
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## API-эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/tasks/` | Список задач |
| POST | `/tasks/` | Создать задачу |
| PATCH | `/tasks/{id}/complete` | Отметить выполненной |
| DELETE | `/tasks/{id}` | Удалить задачу |

## Планы

- [ ] Деплой на Render.com
- [ ] Редактирование задач
- [ ] Фильтры (все / активные / выполненные)
- [ ] Аутентификация