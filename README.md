# 📄 Documentação — gRPC (Projeto de Estudo)

## 🎯 Objetivo

Este projeto foi desenvolvido exclusivamente para:

- entender os fundamentos do gRPC
- experimentar comunicação via protobuf
- validar comportamento (unary e streaming)
- servir como **referência futura**

👉 Não é um projeto com intenção de evolução ou uso em produção.

---

## 🧱 Escopo coberto

O projeto aborda os conceitos essenciais:

- definição de contrato (`.proto`)
- carregamento dinâmico com @grpc/proto-loader
- servidor com @grpc/grpc-js
- implementação de métodos:
  - unary
  - server streaming

- tratamento de erros com `grpc.status`
- uso de tipagem alinhada ao contrato
- teste de carga básico (latência + throughput)

---

## ⚙️ Estrutura geral

```text
src/
  main.ts
  proto/
  grpc/
  storage/
  types/

test/
  client.ts
  executor.ts
  main.ts
```

---

## 🔌 Funcionamento resumido

```text
Client → gRPC → Handlers → Storage (memória)
```

---

## 📡 Métodos implementados

| Método     | Tipo             | Objetivo        |
| ---------- | ---------------- | --------------- |
| CreateUser | Unary            | Criar usuário   |
| GetUser    | Unary            | Buscar por ID   |
| ListUsers  | Server Streaming | Listar usuários |

---

## 🧠 Conceitos aprendidos

### 1. gRPC não é REST

- usa protobuf
- comunicação binária
- contratos fortemente definidos

---

### 2. Tipos de chamada

- **Unary** → request/response simples
- **Streaming** → fluxo contínuo de dados

---

### 3. Status codes

Uso de:

```ts
grpc.status.INVALID_ARGUMENT;
grpc.status.NOT_FOUND;
```

👉 equivalente conceitual ao HTTP, mas próprio do gRPC

---

### 4. Separação mínima de camadas

- handler → entrada/saída gRPC
- store → persistência
- test → simulação de carga

---

### 5. Limitações intencionais

- dados em memória
- sem banco
- sem autenticação
- sem interceptors
- sem arquitetura complexa

👉 tudo proposital para manter foco no gRPC

---

## 📊 Teste de performance

Implementado apenas para:

- observar comportamento sob carga
- entender latência e throughput
- comparar padrões de chamada

Métricas:

- RPS
- latência média
- P95 / P99

---

## 📌 Como usar como referência no futuro

Quando for aplicar gRPC em um projeto real, este projeto serve para:

- lembrar como carregar `.proto`
- estruturar handlers
- lidar com erros (`grpc.status`)
- implementar streaming
- montar um client simples

---

## ⚠️ O que NÃO usar como base direta

- arquitetura (simplificada demais)
- storage em memória
- ausência de validação robusta
- ausência de camadas de domínio

---

## 📍 Conclusão

Este projeto cumpre o papel de:

> **laboratório controlado para entender gRPC**

Sem distrações de:

- banco de dados
- arquitetura complexa
- padrões avançados
