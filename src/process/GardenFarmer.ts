import { sleep } from "../process/util";
import { getTranslation, plantOptions } from "./data";
import { action, computed, makeAutoObservable, observable } from "mobx";

interface Config {
  whatWeWantToPlant: string;
  fertNumber: string | number;
  doPlantNew: boolean;
}

const defaultConfig = (): Config => {
  return {
    whatWeWantToPlant: localStorage.getItem("whatWeWantToPlant") || "пшеница",
    fertNumber: localStorage.getItem("fertNumber") || 0,
    doPlantNew: localStorage.getItem("doPlantNew") === "true"
  };
};

/**
 * TODO: test on all possibles platforms(including opera.goshalucker)
 */
class GardenFarmer {


  private static ActionDelay = 200;
  private static RefreshDelay = 20_000;

  private lastUpdate = new Date().getTime()

  @observable
  private stateTrigger = 1;



  constructor() {
    makeAutoObservable(this);
    this.currentRunningConfig = {...this.config};
  }


  @observable
  public readonly config: Config = defaultConfig()

  @observable
  private currentRunningConfig: Config = defaultConfig()

  @computed
  public get isDirty(): boolean {
    return JSON.stringify(this.currentRunningConfig) !== JSON.stringify(this.config);
  }

  private get plants(): HTMLElement[] {
    return [...document.getElementsByClassName("plant")] as HTMLElement[];
  }

  private get whatWeWantToPlant(): string {
    return getTranslation(plantOptions, this.currentRunningConfig.whatWeWantToPlant)
  }

  @observable
  public isBotRunning: boolean = false;

  persist() {
    localStorage.setItem('whatWeWantToPlant', this.config.whatWeWantToPlant)
    localStorage.setItem('fertNumber', this.config.fertNumber.toString())
    localStorage.setItem('doPlantNew', this.config.doPlantNew.toString())
  }

  @action
  startBot() {
    sessionStorage.setItem('session_bot', 'garden')
    this.stopBot();
    this.lastUpdate = new Date().getTime()
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
   *
   * FEATURE
   * @private
   */

  private getDesiredTick(): number {
    return (this.plants.length + 5) * GardenFarmer.ActionDelay;
  }

  changeSelectionLink(): boolean {
    const a: HTMLElement | null = document.querySelector(
      ".change-selection-link"
    );
    if (!a) return false;

    if (!a.children[0].classList.contains("plant-selection-img")) return false;

    const isAlreadyGood = (
      a.children[0] as HTMLElement
    ).style.backgroundImage.includes(
      this.currentRunningConfig.whatWeWantToPlant
    );

    if (isAlreadyGood) return false;

    a.click();
    return true;
  }

  closePopup(): boolean {
    const pop: HTMLElement | null = document.querySelector(
      'input[value="Отлично!"]'
    );

    if (pop) {
      pop.click();
      return true;
    }
    return false;
  }

  closePopupShare(): boolean {
    const modal = document.querySelector(".wrap-modal-box");

    if (modal) {
      modal.remove();
      return true;
    }
    return false;
  }

  clickPlantChose(): boolean {
    const normalized =
      "Посадить " +
      this.whatWeWantToPlant[0].toUpperCase() +
      this.whatWeWantToPlant.substring(1).toLowerCase();


    console.warn(normalized)

    const a: HTMLElement | null = document.querySelector(
      'a.cell-link[title="' + normalized + '"]'
    );

    if (a) {
      a.click();
      return true;
    }

    return false;
  }

  clickFertilizer(): boolean {
    const f = (document.getElementsByClassName("cell _green") as any)[
      this.currentRunningConfig.fertNumber
    ];

    if (!f) return false;

    f.children[1].click();

    return true;
  }

  /**
   * PLANT SELECTOR
   * @private
   */


  needsWater(plant: HTMLElement): boolean {
    return plant.children.length > 2 && plant.children[2].classList.contains("f-flag-water");
  }

  canFert(plant: HTMLElement): boolean {
    return plant.children.length > 2 && (plant.children[2].classList.contains("f-fertilizer-shop") || plant.children[2].classList.contains("f-flag-fertilize"));
  }

  canCollect(plant: HTMLElement): boolean {
    return plant.children.length > 2 && plant.children[2].classList.contains("f-flag-harvest");
  }

  canCultivate(plant: HTMLElement): boolean{
    return plant.classList.contains("dirt-raw")
  }

  needSelectPlant(plant: HTMLElement): boolean{
    return plant.children.length == 1 && plant.classList.contains("dirt-cultivated") && plant.classList.contains("plant-first");
  }

  needToPlant(plant: HTMLElement): boolean{
    return plant.classList.contains("_plant-selection")
  }

  /**
   * STUFF
   * @private
   */

  action(plant: HTMLElement){
    (plant.children[0] as HTMLElement).click();
  }

  private tick() {

    if(new Date().getTime() - this.lastUpdate >= GardenFarmer.RefreshDelay){
      window.location.href = 'https://vk.myfarm.mobi/garden';
    }
    if (this.changeSelectionLink()) {
      // pass
      console.log('Changed selection')
    } else if (this.closePopup()) {
      // pass
      console.log('Closed popup')
    } else if (this.closePopupShare()) {
      // pass
      console.log('Closed popup share')
    } else if (this.clickPlantChose()) {
      console.log('Click chose plant')
      // pass
    } else if (this.clickFertilizer()) {
      console.log('Click fertilizer')
      // pass
    } else {
      console.log('Plants iteration...')
      this.iteratePlants();
    }
  }

  async iteratePlants() {
    const plants = this.plants;




    for (let index = plants.length - 1; index >= 0; index--) {
      const plant: HTMLElement = plants[index];

      if(this.needsWater(plant)){
        this.action(plant);
      } else if(this.canCollect(plant)){
        this.action(plant)
      } else if(this.canCultivate(plant)){
        this.action(plant)
      }
      else if(this.needSelectPlant(plant) && this.currentRunningConfig.doPlantNew){
        this.action(plant)
      }
      else if(this.needToPlant(plant) && this.currentRunningConfig.doPlantNew){
        this.action(plant)
      }
      else if(this.canFert(plant)){
        this.action(plant)
      }else {
        continue;
      }
      await sleep(GardenFarmer.ActionDelay);
    }

    console.log(plants.length, 'plants iterated')
  }


}

export default new GardenFarmer();
