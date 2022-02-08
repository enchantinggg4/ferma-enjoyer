export const plants = [
  {
    "label": "огурец",
    "value": "cucumber"
  },
  {
    "label": "пшеница",
    "value": "wheat"
  },
  {
    "label": "укроп",
    "value": "dill"
  },
  {
    "label": "морковь",
    "value": "carrot"
  },
  {
    "label": "колокольчик",
    "value": "bluebell"
  },
  {
    "label": "лук",
    "value": "onion"
  },
  {
    "label": "ромашка",
    "value": "camomile"
  },
  {
    "label": "ландыш",
    "value": "may-lily"
  },
  {
    "label": "георгин",
    "value": "dahlia"
  },
  {
    "label": "чеснок",
    "value": "garlic"
  },
  {
    "label": "картофель",
    "value": "potato"
  },
  {
    "label": "редис",
    "value": "radish"
  },
  {
    "label": "петрушка",
    "value": "parsley"
  },
  {
    "label": "сосна",
    "value": "pine"
  },
  {
    "label": "чайная роза",
    "value": "white_rose"
  },
  {
    "label": "орхидея",
    "value": "orchid"
  },
  {
    "label": "щавель",
    "value": "sorrel"
  },
  {
    "label": "кукуруза",
    "value": "corn"
  }
];

export const plantOptions = [
  {
    label: "огурец",
    value: "cucumber",
  },
  {
    label: "пшеница",
    value: "wheat",
  },
  {
    label: "укроп",
    value: "dill",
  },
  {
    label: "морковь",
    value: "carrot",
  },
  {
    label: "колокольчик",
    value: "bluebell",
  },
  {
    label: "лук",
    value: "onion",
  },
  {
    label: "ромашка",
    value: "camomile",
  },
  {
    label: "ландыш",
    value: "may-lily",
  },
  {
    label: "георгин",
    value: "dahlia",
  },
  {
    label: "чеснок",
    value: "garlic",
  },
  {
    label: "картофель",
    value: "potato",
  },
  {
    label: "редис",
    value: "radish",
  },
  {
    label: "петрушка",
    value: "parsley",
  },
  {
    label: "сосна",
    value: "pine",
  },
  {
    label: "чайная роза",
    value: "white_rose",
  },
  {
    label: "орхидея",
    value: "orchid",
  },
  {
    label: "щавель",
    value: "sorrel",
  },
  {
    label: "кукуруза",
    value: "corn",
  },
];


export const fertilizerOptions = [
  {
    label: 'Удобрение 1(30 мин, 1$)',
    value: '0'
  },
  {
    label: 'Удобрение 2(1 час, 5$)',
    value: '1'
  },
  {
    label: 'Удобрение 3(2 часа, 50$)',
    value: '2'
  },
  {
    label: 'Удобрение 4(8 часов, 200$)',
    value: '3'
  },
];

export const factoryOptions = [
  {
    label: "Мельница",
    value: "windmill"
  },
  {
    label: "Завод кормов",
    value: "mixFeed1"
  },

]

export const paymentOptions = [
  {
    label: '10$(30 минут)',
    value: '0'
  },
  {
    label: '50$(2 часа)',
    value: '1'
  }
]


export const productionTypeOptions = [
  {
    label: 'Мука',
    value: 'мука'
  },
  {
    label: 'Кукурузная мука',
    value: 'кукурузная мука'
  },
  {
    label: 'Корм из отрубей',
    value: 'корм из отрубей'
  }
]

export const getByValue = (options: any[], value: string | number) => options.find(it => it.value === value)!!


export const getTranslation = (options: any[], value: string) => getByValue(options, value).label;
