import { eventBus } from '@/untils/eventBus'
export class LoadingCount {
  private count = 0;
  public addCount () {
    this.count++
    this.showLoad()
    return this.count
  }
  public decreaseCount () {
    this.count--
    this.showLoad()
    return this.count
  }
  private showLoad () {
    if (this.count > 0) {
      eventBus.emit('setLoadingStatus', true)
    } else {
      eventBus.emit('setLoadingStatus', false)
    }
  }
  public getCount (): number {
    return this.count
  }
}
