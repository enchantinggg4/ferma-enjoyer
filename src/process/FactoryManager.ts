import { action, computed, makeAutoObservable, observable } from "mobx";

interface Config {
  factoryType: string;
  paymentSize: string | number;
  productionType: string;
}

const defaultConfig = (): Config => {
  return {
    factoryType: localStorage.getItem("factoryType") || "мельница",
    paymentSize: localStorage.getItem("paymentSize") || "1",
    productionType: localStorage.getItem("productionType") || "мука",
  };
};

class FactoryManager {
  private static ActionDelay = 3000;
  private static RefreshDelay = 20_000;

  private lastUpdate = new Date().getTime();

  @observable
  public isBotRunning: boolean = false;

  @observable
  public readonly config: Config = defaultConfig();

  @observable
  private currentRunningConfig: Config = defaultConfig();

  @computed
  public get isDirty(): boolean {
    return (
      JSON.stringify(this.currentRunningConfig) !== JSON.stringify(this.config)
    );
  }

  persist() {
    localStorage.setItem("factoryType", this.config.factoryType);
    localStorage.setItem("paymentSize", this.config.paymentSize.toString());
    localStorage.setItem("productionType", this.config.productionType);
  }

  @action
  startBot() {
    sessionStorage.setItem("session_bot", "factory");
    this.stopBot();
    this.lastUpdate = new Date().getTime();
    window.timer = setInterval(() => {
      this.tick();
    }, this.getDesiredTick());
    this.currentRunningConfig = { ...this.config };
    this.isBotRunning = true;
  }

  stopBot() {
    clearInterval(window.timer);
    window.timer = undefined;
    this.isBotRunning = false;
  }

  /**
   * FEATURE
   */

  private getDesiredTick(): number {
    return FactoryManager.ActionDelay;
  }

  selectFactory(factory: HTMLElement) {
    factory.click();
  }

  matchFactory = (factory: HTMLElement): boolean =>
    (factory.children[0] as HTMLElement).style.backgroundImage.includes(
      this.currentRunningConfig.factoryType,
    );

  /**
   * Checks
   * @private
   */

  checkFactorySelection(): boolean {
    const factories: HTMLElement[] = [
      ...document.getElementsByClassName("factory"),
    ].filter((it) => !it.classList.contains("dirt-virgin")) as HTMLElement[];
    if (factories.length == 0) return false;

    this.selectFactory(factories.find((it) => this.matchFactory(it))!!);

    return true;
  }

  findFactoryButtons(): HTMLElement | false {
    const b = [...document.querySelectorAll(".f-factory-dirt")].find(
      (it) =>
        it.children.length > 0 &&
        (it.children[0] as HTMLElement).style.backgroundImage.includes(
          this.currentRunningConfig.factoryType,
        ),
    );
    if (!b) return false;

    return b.parentElement!!.children[1] as HTMLElement;
  }

  selectPayWages(): boolean {
    const s: any = document.querySelectorAll(
      ".font12.flat-btn.turquoise.pt15.pb15",
    );

    if (s.length > 0) {
      // select n'th item and click
      s[this.currentRunningConfig.paymentSize].click();
      return true;
    }

    return false;
  }

  isSelectProduction(): boolean {
    const s = [...document.querySelectorAll(".flat-content.mb0")];
    const z = s.find((it) =>
      (it.children[0] as HTMLElement)
        .textContent!!.toLowerCase()
        .includes(this.currentRunningConfig.productionType),
    );
    if (!z) return false;

    const startButton: HTMLElement | null = z.querySelector(
      ".font12.flat-btn.turquoise.mt10",
    );

    if (!startButton) return false;

    startButton.click();

    return true;
  }

  isSelectAmount(): boolean {
    const s: HTMLInputElement | null = document.querySelector(
      ".flat-btn.turquoise.mt5.font12",
    );
    if (!s) return false;

    if (s.value !== "Произвести") return false;

    s.click();

    return true;
  }

  /**
   * Tick
   * @private
   */
  private tick() {

    if(new Date().getTime() - this.lastUpdate >= FactoryManager.RefreshDelay){
      window.location.href = 'https://vk.myfarm.mobi/industry';
    }

    const buttons = this.findFactoryButtons();
    if (this.checkFactorySelection()) {
    } else if (buttons) {
      const s: HTMLElement = buttons.querySelector(
        ".f-panel-btn-active",
      ) as HTMLElement;

      if (s && !s.children[0].classList.contains("hire")) s.click();
    } else if (this.selectPayWages()) {
    } else if (this.isSelectProduction()) {
    } else if (this.isSelectAmount()) {
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new FactoryManager();
