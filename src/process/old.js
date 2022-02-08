const industryMapping = {
  'мельница': 'windmill',
  'комбикорм': 'mixFeed1'
};

const paymentMapping = {
  '10$(30 минут)': '0',
  '50$(2 часа)': '1'
};



(function(){
  // let factoryType = 'windmill';
  // let productionType = "мука";
  // let paymentSize = 1;
  if(window.location.href.startsWith('https://vk.myfarm.mobi/wicket/bookmarkable')){
    window.location.href =  'https://vk.myfarm.mobi/industry';
  }

  const data = {

  };

  let isRunning = false;


  const widget = createForm('industry', [
    { type: 'status', text: 'Не запущен'},
    { type: 'select', name: 'factoryType', options: Object.keys(industryMapping)},
    { type: 'select', name: 'productionType', options: ['мука', 'кукурузная мука']},
    { type: 'select', name: 'paymentSize', options: Object.keys(paymentMapping)},
    { type: 'button', 'text': 'Остановить бота', callback: () => {
        var industryInterval = window.industryInterval || undefined;
        if(industryInterval){
          clearInterval(window.industryInterval);
          console.log("inteval cleared")
          isRunning = false;
          updateStatus();
        }
      }}
  ], (ndata, initial) => {

    data.factoryType = industryMapping[ndata.factoryType];
    data.paymentSize = paymentMapping[ndata.paymentSize];
    data.productionType = ndata.productionType;

    setTimeout(() => startBot(), 0)

  });

  function updateStatus(){
    widget.querySelector('status').textContent = isRunning ? 'Бот запущен' : 'Бот не запущен'
  }


  function matchFactory(factory){
    return factory.children[0].style.backgroundImage.includes(data.factoryType)
  }

  function selectFactory(factory){
    factory.click();
  }

  function checkFactorySelection(){
    const factories = [...document.getElementsByClassName('factory')].filter(it => !it.classList.contains('dirt-virgin'));
    if(factories.length == 0) return false;

    selectFactory(factories.find(matchFactory));

    return true;
  }


  function findFactoryButtons(){
    const b = [...document.querySelectorAll('.f-factory-dirt')].find(it => it.children.length > 0 && it.children[0].style.backgroundImage.includes(data.factoryType))
    if(!b) return false;

    const buttons = b.parentElement.children[1];
    return buttons;
  }

  function selectPayWages(){
    const s = document.querySelectorAll('.font12.flat-btn.turquoise.pt15.pb15');

    if(s.length > 0){
      s[data.paymentSize].click();
      return true;
    }

    return false;
  }


  function isSelectProduction(){

    const s = [...document.querySelectorAll('.flat-content.mb0')];
    const z = s.find(it => it.children[0].textContent.toLowerCase().includes(data.productionType))
    if(!z) return false;

    const startButton = z.querySelector('.font12.flat-btn.turquoise.mt10');

    if(!startButton) return false;


    startButton.click();

    return true;
  }

  function isSelectAmount(){

    const s = document.querySelector('.flat-btn.turquoise.mt5.font12');
    if(!s) return false;

    if(s.value !== "Произвести") return false;

    s.click();

  }

  function tick(){
    console.log("Factory tick")


    if(checkFactorySelection()){

    }else if(findFactoryButtons()){
      const buttons = findFactoryButtons();

      const s = buttons.querySelector('.f-panel-btn-active')

      if(!s.children[0].classList.contains('hire'))
        s.click();

    }else if(selectPayWages()){

    }else if(isSelectProduction()){

    }else if(isSelectAmount()){

    }

  }



  function startBot(){

    var industryInterval = industryInterval || undefined;
    if(industryInterval){
      clearInterval(window.industryInterval);
      console.log("inteval cleared")
      isRunning = false;
      updateStatus();
    }

    isRunning = true;
    updateStatus();
    window.industryInterval = setInterval(() => {
      tick();
    }, 3000);

    setInterval(() => {window.location.reload()}, 30000)
  }



})();
