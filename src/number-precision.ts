export class NumberPricision {
  private integerRegexp = /^(-|\+)?\d+$/

  public getPrecision(num: number | string): number {
    if (this.integerRegexp.test(num.toString())) {
      return 0
    }

    return num.toString().split(`.`)[1].length
  }
}
