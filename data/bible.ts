export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  [key: string]: string;
}

export interface Book {
  name: string;
  chapters: { [key: string]: Chapter };
}

export const bibleData: Book = {
  name: "Gênesis",
  chapters: {
    "1": {
      "1": "No princípio, Deus criou os céus e a terra.",
      "2": "A terra estava vazia e sem forma definida, com trevas cobrindo o abismo, enquanto o Espírito de Deus pairava sobre as águas.",
      "3": "Deus disse: 'Haja luz', e a luz surgiu.",
      "4": "Deus viu que a luz era boa e separou a luz das trevas.",
      "5": "Chamou a luz de dia e as trevas de noite. Houve tarde e manhã: primeiro dia.",
      "6": "Deus disse: 'Haja um firmamento entre as águas para separá-las.'",
      "7": "Deus fez o firmamento e separou as águas acima dele das águas abaixo dele. Assim aconteceu.",
      "8": "Chamou Deus ao firmamento céu. Houve tarde e manhã: segundo dia.",
      "9": "Deus disse: 'Que as águas abaixo do céu se juntem em um só lugar e surja o solo seco.' Assim foi feito.",
      "10": "Deus chamou o solo seco de terra e as águas reunidas chamou mares. Deus viu que era bom.",
      "11": "Deus ordenou que a terra produzisse vegetação, plantas com sementes e árvores frutíferas. E assim aconteceu.",
      "12": "A terra produziu plantas e árvores frutíferas, conforme suas espécies. Deus viu que era bom.",
      "13": "Houve tarde e manhã: terceiro dia.",
      "14": "Deus ordenou que houvesse luzes no céu para separar dia e noite, indicando tempos, dias e anos.",
      "15": "Estas luzes iluminariam a terra. E assim aconteceu.",
      "16": "Deus criou duas grandes luzes: o sol para governar o dia e a lua para governar a noite, e também as estrelas.",
      "17": "Deus colocou-as no céu para iluminar a terra.",
      "18": "Governar o dia e a noite, e separar luz e escuridão. Deus viu que era bom.",
      "19": "Houve tarde e manhã: quarto dia.",
      "20": "Deus disse: 'Que as águas produzam seres vivos e que as aves voem pelo céu.'",
      "21": "Deus criou grandes criaturas marinhas e todos os seres aquáticos e aves, cada um segundo sua espécie. Deus viu que era bom.",
      "22": "Deus abençoou-os, dizendo: 'Multipliquem-se, encham as águas e as aves se multipliquem na terra.'",
      "23": "Houve tarde e manhã: quinto dia.",
      "24": "Deus disse: 'Que a terra produza criaturas vivas: gado, répteis e animais selvagens.' E assim foi.",
      "25": "Deus fez os animais segundo suas espécies. Viu Deus que era bom.",
      "26": "Então Deus disse: 'Façamos o homem à nossa imagem e semelhança, para dominar sobre os animais e a terra.'",
      "27": "Deus criou o homem à sua imagem, macho e fêmea os criou.",
      "28": "Deus abençoou-os dizendo: 'Sejam férteis, multipliquem-se, dominem sobre todos os seres vivos.'",
      "29": "Deus deu aos seres humanos todas as plantas e árvores para alimento.",
      "30": "Aos animais e aves, Deus deu plantas verdes. Assim aconteceu.",
      "31": "Deus observou tudo o que criou, e era muito bom. Houve tarde e manhã: sexto dia."
    },
    "2": {
      "1": "Assim foram terminados os céus, a terra e todos os seus habitantes.",
      "2": "No sétimo dia, Deus descansou, pois havia concluído sua obra.",
      "3": "Deus abençoou o sétimo dia e o santificou, pois nele descansou de toda criação.",
      "4": "Esta é a história da criação dos céus e da terra. Quando Deus criou a terra e o céu.",
      "5": "Ainda não havia plantas cultivadas ou chuva, pois não havia quem cultivasse o solo.",
      "6": "Mas um vapor subia da terra e regava o solo.",
      "7": "Então Deus formou o homem do pó da terra e soprou vida em suas narinas. Assim o homem tornou-se um ser vivo.",
      "8": "Deus plantou um jardim no Éden, no Oriente, onde colocou o homem.",
      "9": "Fez brotar no jardim toda árvore agradável e útil. No centro colocou a árvore da vida e a árvore do conhecimento do bem e do mal.",
      "10": "Um rio saía do Éden para regar o jardim, dividindo-se em quatro rios principais.",
      "11": "O primeiro é Pisom, que rodeia a terra rica em ouro, chamada Havilá.",
      "12": "Lá o ouro é puro, há bdélio e ônix.",
      "13": "O segundo rio é Giom, que rodeia a terra de Cuxe.",
      "14": "O terceiro rio é o Tigre, correndo ao leste da Assíria. O quarto rio é o Eufrates.",
      "15": "Deus colocou o homem no Éden para cultivá-lo e cuidar dele.",
      "16": "Deus ordenou ao homem: 'Você pode comer de qualquer árvore do jardim.'",
      "17": "Exceto da árvore do conhecimento do bem e do mal, pois, ao comer dela, certamente morrerá.",
      "18": "Deus percebeu que não era bom o homem ficar só, e decidiu criar uma ajudadora.",
      "19": "Deus criou da terra animais e aves, trazendo-os ao homem para dar-lhes nomes.",
      "20": "O homem nomeou todos, mas não encontrou uma companhia adequada.",
      "21": "Então Deus fez o homem cair num profundo sono, retirou-lhe uma costela e fechou o lugar com carne.",
      "22": "Com a costela, Deus formou uma mulher e trouxe-a ao homem.",
      "23": "O homem exclamou: 'Esta sim, é osso dos meus ossos e carne da minha carne! Será chamada mulher, porque veio do homem.'",
      "24": "Por isso, o homem deixa pai e mãe, une-se à esposa, tornando-se uma só carne.",
      "25": "O homem e a mulher estavam nus e não sentiam vergonha alguma."
    }
  }
};

export const bibleBooks = {
  antigoTestamento: [
    { name: 'Gênesis', chapters: 50 },
    { name: 'Êxodo', chapters: 40 },
    { name: 'Levítico', chapters: 27 },
    { name: 'Números', chapters: 36 },
    { name: 'Deuteronômio', chapters: 34 },
    { name: 'Josué', chapters: 24 },
    { name: 'Juízes', chapters: 21 },
    { name: 'Rute', chapters: 4 },
    { name: 'I Samuel', chapters: 31 },
    { name: 'II Samuel', chapters: 24 },
    { name: 'I Reis', chapters: 22 },
    { name: 'II Reis', chapters: 25 },
  ],
  novoTestamento: [
    { name: 'Mateus', chapters: 28 },
    { name: 'Marcos', chapters: 16 },
    { name: 'Lucas', chapters: 24 },
    { name: 'João', chapters: 21 },
    { name: 'Atos', chapters: 28 },
    { name: 'Romanos', chapters: 16 },
    { name: 'I Coríntios', chapters: 16 },
    { name: 'II Coríntios', chapters: 13 },
  ]
};