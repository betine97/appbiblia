# Requirements Document

## Introduction

Esta especificação define as melhorias necessárias para a barra de progresso circular dos módulos na tela de jornada. O objetivo é criar uma experiência visual mais atrativa e intuitiva, com uma barra de progresso segmentada que pulsa e tem espaçamento adequado, além de ajustes no posicionamento dos módulos e nas imagens utilizadas.

## Requirements

### Requirement 1

**User Story:** Como usuário, eu quero ver uma barra de progresso circular dividida em 4 segmentos distintos, para que eu possa visualizar claramente o progresso em etapas de 25%.

#### Acceptance Criteria

1. WHEN a barra de progresso é renderizada THEN ela SHALL ser dividida em exatamente 4 segmentos iguais de 25% cada
2. WHEN cada segmento é exibido THEN ele SHALL ter um espaço visível entre os outros segmentos
3. WHEN o progresso é de 25% THEN apenas o segmento superior direito SHALL estar preenchido
4. WHEN o progresso é de 50% THEN os dois segmentos da direita (superior e inferior) SHALL estar preenchidos
5. WHEN o progresso é de 75% THEN os segmentos da direita e o inferior esquerdo SHALL estar preenchidos
6. WHEN o progresso é de 100% THEN todos os 4 segmentos SHALL estar preenchidos

### Requirement 2

**User Story:** Como usuário, eu quero que a barra de progresso tenha um efeito pulsante, para que eu possa identificar visualmente qual módulo está ativo.

#### Acceptance Criteria

1. WHEN um módulo está ativo THEN a barra de progresso SHALL ter um efeito de pulsação contínua
2. WHEN a pulsação ocorre THEN ela SHALL aumentar e diminuir o tamanho da barra suavemente
3. WHEN um módulo não está ativo THEN a barra de progresso SHALL permanecer estática
4. WHEN a animação de pulsação é executada THEN ela SHALL ser suave e não interferir na legibilidade

### Requirement 3

**User Story:** Como usuário, eu quero que a barra de progresso tenha uma margem de proteção adequada em relação à imagem do módulo, para que os elementos não se sobreponham visualmente.

#### Acceptance Criteria

1. WHEN a barra de progresso é renderizada THEN ela SHALL manter uma distância mínima de segurança da imagem central
2. WHEN a imagem do módulo é exibida THEN ela SHALL estar completamente dentro do círculo interno sem tocar a barra
3. WHEN a barra pulsa THEN ela SHALL manter a margem de proteção mesmo no tamanho máximo da pulsação

### Requirement 4

**User Story:** Como usuário, eu quero que os módulos sejam posicionados mais para baixo na tela, para que haja melhor distribuição visual do espaço.

#### Acceptance Criteria

1. WHEN a tela de jornada é carregada THEN os módulos SHALL ser posicionados com mais espaço superior
2. WHEN os módulos são reposicionados THEN eles SHALL manter o alinhamento e espaçamento entre si
3. WHEN o scroll é necessário THEN ele SHALL funcionar normalmente com o novo posicionamento

### Requirement 5

**User Story:** Como usuário, eu quero que diferentes módulos utilizem imagens específicas, para que cada módulo tenha sua identidade visual correta.

#### Acceptance Criteria

1. WHEN o módulo Gênesis é renderizado THEN ele SHALL utilizar a imagem m1.png
2. WHEN qualquer outro módulo é renderizado THEN ele SHALL utilizar a imagem m2.png
3. WHEN as imagens são carregadas THEN elas SHALL manter o tamanho e posicionamento adequados
4. WHEN um módulo está bloqueado THEN a imagem SHALL manter a opacidade reduzida conforme o design atual