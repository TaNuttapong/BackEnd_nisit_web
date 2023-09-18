# my project

## config environment

```bash
cp .env.example .env
```

## create DB

```bash
docker compose up -d
```

## how to run

- install

```bash
yarn
```

- dev

```bash
yarn dev
```

- prod

```bash
yarn start
```

## migrate db

```bash
npx prisma migrate dev
```
