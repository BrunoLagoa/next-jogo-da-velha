# 🎯 Google AdSense Setup Guide

## 📋 **Pré-requisitos**

1. **Conta Google AdSense** aprovada
2. **Publisher ID** da sua conta AdSense
3. **Slots de anúncio** criados no painel do AdSense

## ⚙️ **Configuração das Variáveis de Ambiente**

Adicione estas variáveis ao seu arquivo `.env.local`:

```bash
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=2345678901
NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT=3456789012
NEXT_PUBLIC_ADSENSE_RESULT_SLOT=4567890123
```

### **Como obter os valores:**

1. **Publisher ID**: No painel do AdSense → Conta → Informações da conta
2. **Slots**: AdSense → Anúncios → Por site → Criar novo slot

## 🎮 **Estratégia de Anúncios Implementada**

### **1. Banner no Lobby (728x90)**
- **Localização**: Topo e final da lista de salas
- **Frequência**: Sempre visível
- **Receita estimada**: R$ 0,10 por visualização

### **2. Sidebar no Jogo (250x400)**
- **Localização**: Lateral direita durante o jogo
- **Visibilidade**: Apenas em telas grandes (lg+)
- **Receita estimada**: R$ 0,15 por visualização

### **3. Intersticial Entre Jogos (320x250)**
- **Frequência**: A cada 3 jogos concluídos
- **Countdown**: 5 segundos antes de poder fechar
- **Receita estimada**: R$ 0,50 por visualização

### **4. Banner de Resultados (728x90)**
- **Localização**: Após vitória/empate
- **Timing**: Aparece com os botões de ação
- **Receita estimada**: R$ 0,12 por visualização

## 📊 **Controle de Exibição**

Os anúncios são controlados via:

```typescript
// Habilitar/desabilitar anúncios
const AD_PLACEMENTS = [
  {
    id: 'lobby-banner',
    enabled: true,
    location: 'lobby'
  },
  {
    id: 'interstitial-between-games',
    enabled: true,
    frequency: 3 // A cada 3 jogos
  }
];
```

## 🚀 **Deploy e Aprovação**

### **Passos para Produção:**

1. **Configure domínio real** no AdSense
2. **Substitua Publisher ID** de teste
3. **Crie slots específicos** para cada tipo de anúncio
4. **Teste em produção** antes do lançamento
5. **Aguarde aprovação** do Google (pode levar até 72h)

### **Checklist de Aprovação:**

- ✅ Conteúdo original e de qualidade
- ✅ Site totalmente funcional
- ✅ Política de privacidade implementada
- ✅ Navegação clara e intuitiva
- ✅ Design responsivo
- ✅ Velocidade de carregamento otimizada

## 💰 **Projeção de Receita**

### **Cenário Base (1000 usuários/mês):**

| Tipo de Anúncio | Visualizações | CPM | Receita Mensal |
|------------------|---------------|-----|----------------|
| Banner Lobby     | 5.000         | R$ 3,00 | R$ 15,00 |
| Sidebar Jogo     | 3.000         | R$ 4,00 | R$ 12,00 |
| Intersticial     | 500           | R$ 8,00 | R$ 4,00 |
| **Total**        | **8.500**     | **-** | **R$ 31,00** |

### **Cenário Otimista (10.000 usuários/mês):**

| Tipo de Anúncio | Visualizações | CPM | Receita Mensal |
|------------------|---------------|-----|----------------|
| Banner Lobby     | 50.000        | R$ 3,00 | R$ 150,00 |
| Sidebar Jogo     | 30.000        | R$ 4,00 | R$ 120,00 |
| Intersticial     | 5.000         | R$ 8,00 | R$ 40,00 |
| **Total**        | **85.000**    | **-** | **R$ 310,00** |

## 🛠️ **Personalização Avançada**

### **Adicionar novos tipos de anúncio:**

1. **Crie slot no AdSense**
2. **Adicione à configuração**:
```typescript
export const AD_CONFIG = {
  slots: {
    newSlot: "NOVO_SLOT_ID"
  }
};
```
3. **Use o componente**:
```jsx
<AdBanner slot={AD_CONFIG.slots.newSlot} />
```

### **Controlar frequência:**

```typescript
const { maybeShowInterstitial } = useAds();

// Mostrar anúncio após ação específica
maybeShowInterstitial();
```

## 🎯 **Otimizações de UX**

1. **Anúncios não bloqueiam** a jogabilidade
2. **Countdown obrigatório** nos intersticiais
3. **Tamanhos responsivos** em dispositivos móveis
4. **Posicionamento estratégico** que não incomoda
5. **Frequência controlada** para não irritar usuários

## 📱 **Próximos Passos**

1. **Implementar AdMob** para versão mobile
2. **A/B testing** de posicionamentos
3. **Analytics detalhados** de performance
4. **Otimização baseada** em dados reais
5. **Integração com** outros ad networks 