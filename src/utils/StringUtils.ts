export default class StringUtils {

    public static maskCurrency(string: any): string {
        string = string.toString().replace('.', '').replace(',', '').replace(/\D/g, '')

        const options = { minimumFractionDigits: 2 }
        const result = new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(string) / 100
        )

        return 'R$ ' + result
    }

}