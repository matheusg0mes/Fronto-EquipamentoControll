<<<<<<< HEAD
# Front-EquipControll
=======
# EquipControl Web

Front-end React + Vite para a API Spring Boot de gestão de empréstimos de equipamentos.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
```

O Vite faz proxy de `/api/*` para `http://localhost:8080/*` (ver `vite.config.js`), então não precisa de CORS em dev.
Em produção, defina `VITE_API_URL` com a URL da API.

## Arquitetura

```
src/
├── api/          # instância axios + tratamento de erro
├── services/     # chamadas REST por entidade (e ViaCEP)
├── hooks/        # useResource + hooks por entidade (estado/carregamento)
├── utils/        # regras puras (datas, dias de atraso)
├── constants/    # enum TipoEquipamento
├── components/
│   ├── layout/   # Sidebar, Layout
│   ├── ui/       # StatCard, Modal, Field, Badge, Icons...
│   └── forms/    # formulários de Equipamento, Colaborador, Empréstimo
├── pages/        # Dashboard, Equipamentos, Colaboradores, Empréstimos, Atrasados
└── styles/       # global.css (tokens + componentes)
```

## Endpoints esperados (ajuste nos services se forem diferentes)

| Método | Rota                          | Uso                      |
|--------|-------------------------------|--------------------------|
| GET    | `/equipamentos`               | listar                   |
| POST   | `/equipamentos`               | criar                    |
| GET    | `/colaboradores`              | listar                   |
| POST   | `/colaboradores`              | criar (com `endereco`)   |
| GET    | `/emprestimos`                | listar                   |
| POST   | `/emprestimos`                | criar                    |
| PUT    | `/emprestimos/{id}/devolucao` | registrar devolução      |

"Atrasado" = empréstimo sem `dataDevolucao` e com `dataPrevistaDevolucao` anterior a hoje (calculado no front).
>>>>>>> master
# Fronto-EquipamentoControll
