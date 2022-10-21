import { Component, OnInit, Input, OnChanges, ElementRef } from "@angular/core";
import * as echarts from "echarts";
import "echarts-gl";
import { Constants } from "src/app/commons/constants";
@Component({
  selector: "app-chart-pie-3d",
  template: `
    <ng-container *ngIf="!loading && isData== 0">
      <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading && isData== 0">
      <nz-spin [nzSpinning]="loading"></nz-spin>
    </ng-container>
    <div *ngIf="isData == 1" class="text-center height-full">
      <div
        class="pie3d-animation"
        id="chartType"
        echarts
        [options]="pieChartOption"
        style="height:100%;width:100%;"
      ></div>
    </div>
  `,
})
export class ChartPie3DComponent implements OnInit, OnChanges {
  dom: any;
  @Input() loading = false;
  @Input() chartOption = [];
  @Input() pieColors = ['rgba(91, 192, 241, .9)', 'rgba(41, 188, 192, .9)', 'rgba(19, 182, 129, .95)', 'rgba(197, 127, 49, 1)', 'rgba(223, 192, 66, 1)', 'rgba(110, 152, 185, 1)', 'rgba(93, 117, 167, 1)', 'rgba(98, 89, 180, 1)'];
  @Input() distance = 175;  // 视距控制大小

  constructor(private el: ElementRef) { }

  // base64ImageBg = '/assets/images/bg/pie3d-bg.png';
  // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAABRCAMAAADvshr3AAAC/VBMVEUAAAANXWQGNjwBDBAEKjcDHisCIDABGycBHygDJDEBFyQBFR8BHysDKTQCFRsBDxQBFyoHQVEDKjwQUo8CFhgADBEDJCwBHC8BCg8BDhIADxcBHSkCGSIAFycCJTAFQEwOS1EDLDEFPmMepNUYmqYDLDQELUEOZ2cCISMCFBgGNDQCI0AFM0sNXYEEODoDMlQGRl8GMDgGQEUbmc8CKTEITGwNYmoRdmMYiH8HSoAEMUcHSHEFP3AQcGMJVk0Odm0KP2ACRlMHRoEHQlcUfmoZhK8egIoYhLIcms0gr+cJP3EZdaQXfqcVga0ifooYmNAADhMBDREBExkAEBQBEhcBFRsAEBYAFyEBCw0AFh8EKksAGicBHTMAGiMCKEcAHSkCJT4FQ30FPXABHC0BKVECLVQDLlACLlgCIjoBFR0BDhUFQHYBJUMAFyYDMlsAChEEMFUBHjgEPnQDNmgFNmABIysIS4gJRHgBCAkAHy4EOGQBHiYDP3oDO20BIzYBIjMJUJACNGMIOmoFR4UDKEEAGiwAEh0LU5QBJ0wRX6MITY0FRYECL10CJzgAGTEBFysMVpgCMmADNVAHNFcBJjABOHAACQ0NT4oCL0cBID8ADhopdrsTZKgQXJ8DLDEAIi8DNmsDPGcLRn4KQXIDL0suesIZaq4COnYDOFoAAwMaYqUVWZkSVpMBJEgENT8FSXoGUHMEQWwDP1MBEiUhb7Qha68XbaUDMDcMWJ0MSoIGSoEWZ3UFSHERWWMOUVodcpYHUIUYboANYYAQX24CHSEleLAdca8IVHwIVmsESVYCOUgCIUMZXp8XbY0pc7YZZasUaZQhdowCP2AygckhcLkSaoUERmkFTWcFQUcFPUABLUAOXpkJVYkERl8LRko8idAZa50tg6gHRk+Xy/ODv/Iidqgac4u84fkug7QgZ6kmfJMNYXhuses2f70fd58IWnRNmd05g8UYYW0RO2fa8Pkpf6AZUIYLV4Op1vdZo+MPX4vu+PxIkNI4jrgleJ6Or5psAAAAUHRSTlMABgz6FGQafj4q0YtJIK/48VU3/ueecVfr0sK9neKfbf3nnR0P1q4f+PWZ7+rJxL+vjII99OKIMXvx1NGGVERD8uvczmVSqIVoLPTUr5nLfsbE/kQAABqtSURBVHja7NpJiNpQGAfwZ/d9o/tup4vd94WulO50ISZmHJGQQi+tUEoPOQwB59L25kWkiIdIoYeeQkihHpxRogFNQNABjQqWKlSKwgiCFAY69HtpSxe6XzqB/mEGRBF/fkteQPQ/CNlsyFrpO4j+JrPnI4vl4NW5s/+4mrPmzp2CLJa+S1tWzfujNpw/cyl9b67VOhehzdOXOubO+P2eXavSFPF4ObJepizb7pgz7zdfC9V0Eb57U6cjC2bFSlpdOvN3hm7WGpWkCAqgi5EFM38VRdGOtb9sX9tMu+qinARFPZ56Clkw0xbApycdC36xfeev52mKwlAX6bAkdMoyinA6KXXNLPSTLFmDtxAOxcdeWhRKOLHUPWcF+mHmbcH1BKmPFsovN55HFsyU9bTTaZZq3XLbj5x2nqTgyyAoUnj50qrQrTEVagpFdTn2T/u+8xBDuzCUUsVKGaDHkAUzbU9F5EgnplKO9fO/N5+HVLIfBhnGswLKjRutCZ2/pVKuCK4BggCKumcJ+jYz7LyHpPD3wIvll4lEwqLQ2XboxrJg1hRqtmX6N2cH2x7OAwUFKVNpNBIYmrAkdNYhIQYdKbjumVKusvXr9t0guF3ApPr5SqOcGMHSEUtCVzgETqg0QGrOKS1U9sz4srPt/IcLqFvUGo2RkRFwWhM6MyQIQgymT+gHKEhjlfVfdC80rumkYwmtkQAo/HUvWu82DdmWhYSYEBJAypklvcdXKp9vwxbDxsVOUkgAsdsFabobv7gZWS7b5nAQIQZzWlGdToASofKuTwdf2xbObFyKx13bjafxv3j8Rh+yXBYvDYXAKQj6y4ZImgcHt1je8WkTxRizoP1iNz2SBWg2DekePoOsFtt6XgiFYqIgiHqjwRGmlCuXl3x4dhfn7idg5/KJbhqcH6DxdOKI5Yb0zDoVd64Yi8XEhiZ68JgOuMTG/o8F5WkCTn6uGAjbcUUBZTyuxEfOHUXWyuatDM+ZJYVUNLOkUFNOOzsNF/SswLhgQH2ejfFsW1EKSjaNvYWuvs9i6+jIIoCGMFTXAap9uMQMqA0N352e1kNuHzz2celiJ95UlHYnne0ohUJcP2St5r1gpz86y+WyLGsJncHQe6SoHYCnN+kcDVBnfzUOdTShnWy70CqkNb/dSrdqB0/cAaeA51Mva1pZy2ohn7mOBO0cHBrOiixpniF0mMxmQVHi7U5WabWabaN6d4t1Nu/B3V5S5Xk+FBOqMgSgWZEGpjmk89E2LezFI0q5daWZKhSaRaXY6WCokg1G7+6xivTKbpZW+UGOiwZEXZaDslxrtxuMCXXLxmK0uBbmXbB0+xldaRUBWigUO6kcQIsdPTTI7DlliTntu+h/xHN4QoeGRBmUNdloKwkWd+7AHTl7AG2qVRkK7yImnCrkCr1Wq5UrFovNQrOZ0qMc77YfscDu7du0yONlOZAG/H5dk2tZo5ZVmsYt6iN0HzpsQqGkajWbKyZ79V4yCdIUUHO1KBtiPYf2Tfbrqe3Cvu0kzwKU9VcDN4OaZkiGAXNoRE3oI1naiyTDnFEnYULz9Xd109lJNVtJ6cEtLjT4iDl+flK375XruyIRleEh7FAgUNXlmmEY2WILQ50E5aQx9DBASQLCVLPJXO4DNJWCKZ1Itp9GoRm4OxH7kW1osmbz5d3VSL+q8izPRqMh7BwtGYaUyfWSNZ7Ah0BPTdqHTkhBFkMpz00jOZHrvevlU5DxXHJsLBUeDHEs63V7HJN1J9kOXtt1lyA9boZnoShDATEM0GFJaheT9aTMgMw54DWkTWif9CwKUKeP9pdyY8mx+ut8KpPJpPIY+tQfGIreesgyEdK+4+gkpPZdOvHAQ99xuxkvyw5G4VSkh5/KtVLpbXJiopcLPnJiqF+SDqANmVrAg5cRNVhLJV+96k1M5AA6DtDXuVo1ANJBnmHukJ4tB85Msv3bd3n3zkiEgbgZLgoXFn8gHAw+A6eUq9d70JGRAdhFvnCntALNlobDLGV28rPMq2T+9Zt68u3wMJR07EVeClZhXUdhn/GMO7LQfmASSTcfvLR7l/uRh2F5L+OG8YwODd0OVIPPnpRKw+O9OjhKD52QgeejndElyHZYGr0fwVDyqZSfyI+9qdfz0mhNGs/n8xlZD4dvRm/dAihU1bdyx2T5AUff5WuHHzwnIgwPTcswLK5nIHDzQVgeffKk9HbsDSzVzFNyAM5FjwOSdBzOuicz0oNHBG7ewWeZFy/yr+tvXo+XRoffjo+nhoPhYNh/65bX64X345k721dPn4b+ed4Ta2axidRxHI92623rulXbumriGa94azxijMYHY4yFMjPMQLkGBoabLQsFy9Eu0JaWHqDQa9OlpZV0t0Hc3WZLSORB6MN6bKrZB+GhL5usD5oYEzcxMfH7xyPeGuPxL8z8gTDM5//9Xf/+/xe99OrLzyViZhmLWAvnVPT5lny+UCISmU3u7OxkCec375R3Ej0QNC3LN4r3kP/RF7bzalkPWixS/HrzzG61ev7cBX/2rcqF7bMATX4SCi2pFWhNV+3sbr3kf41KsNlX7n9OOd8jo1jmXYw/r47yS6/7QprZWU7IA3R79/w3598vF5MMEXTA99aFfHNbw62V8iesBInVrEi9dWZ3t1Y9X93dLpa3t98qvz0rpJKJRMKHyx1UE6+npHd3XXnZnv+N9bYX74eYDrNUZFiGsfXB1BQQFXpCE+dOMesv7J7/7PyZ/M5ZCIqQa041ync2b3ePt7KzJJP00OZe00pjd3OzWj13brOxXSiXoWgumczNzgZDwdBSFAYMUkra3tF9ZetVl//ntBfd9sjjLzwaI2uCUophWJaBnvzSQfVBpTKhySVT+WK5uL1b/ez87ll7UYhBUPmAa6uS/35ReG+pkmTJ+q9E5IoVkJ47d662eaxSKBfzSaDmncgyry+FfD6MHA9NpTJZS0t75xU33/LEf7bpCpQvPv7ANfNph4SWUqzI9vVBS58Sf/xSUBNR5fI72WK58PXn1Q/OnSm6zyZZkloGbMONLBG02R5slBMUdMbMTSg2gFmtVmubu/WMLp9KzkZmc7O5SAJR7fWDvO81lpKiUTKz2SFp77jxoWfv+g+Eveiuvbc+dc28Y2AAYjYhYbiswhcMJoJ8VKmJRFRCVleoNM5Ua2u7F8oB71lfWg4H7ckfK9x32Y+Xeayhc9HNxX91vlA/8QG8dBOtXnDDRXMqIZ9PRkw+nlcjuqkZSoZGg5Y2S9KOzq7rrr/s6ov/RVpQ3nxFe3pgIA1KjLEIiyV+iRIeHuVb0qhGBSGVXSkcq+9Wa+u46/5SIUI3HXSj0khd+pN14if3+ad6JWawhs42Fhc+q9Zqn66BtFJMcbM5QUDsTeCaIZgvbxOlMik8lQYsjNgsT7d0drVdef3eZ5+46/Z/nPfiy1v3d3XK5XJJrwyYeIATTgQdgxBSYwpaOQ5BCJSH19drtfe2isYJbSFHwXDTaVeh4b/zp+51dSUzxAwQ46UT5frmwolNYryba4uNrNXKIRolIawpGISmwdBrjNj00yaujKZlMkgraWm/u+OKtnsevgW8/4i+F1189bWt+7s7WyRgJD8jBSRFAVTtc5lMJo1KleM4IeWeGfIXK/Wxen1sfb1eCfgDy56UmIaDpl3eTPapy3++sl/JOBGlyMKEslhfq9Vq8NPNxcWxRrk4nM2rVEJOZQ2iHAxpEgcZVhQpFrRglaH1khvBZrO0PC1pabm74447H7pl77V/G/eiPZdf1Xrp/rauznZAmmXNJiUNI8v2KXh+UhlUJVPOpGAw+oezg/Hpo2OL0x7PSKNQ9A8VK5WUApXCwIBreVp3L1Loz0mfDA9HYbp4+LIX6otg/aC2WB8bq+Pbbrddv6FSaVzQNKpW44GpGwYX4Q8OS8YatDSh7WlWl8Bt7+i6cf+l19+yl1j0nr/IvOfa1of2t3V3dXS2kFzf8901cXmcoKbI4kcVSyGTBrWeIOScbr9Oqy1Vpuv7MtPheMbrNuj1fm9RRSSDnssjuntv+PXq//PTw4ykudR23Ok5vFZbA+vm4li4UiiuFJa9QwbV3GT09SACgCmoVLAs8jU0RazHHzRFo8mNYWqLgwMtDXtGg0l3dbftv/ketIceBvpll1/yS/CLr76s9UoQdhJDTcvNZJueTApToZs+QqQU8WBIRgkpNZwzmVRxwkzAG6+E4+ERb8A7fsiz4tRPGIeWdSazA3rKNVtx/72tvzWcT8d1cw7EZJDqPYtrJ05u1qonPjxVqWTClVLJ259PcZFIJOFSKkNKHnEPBSHEpHAktMg3NLjBSY40bTb3IDc3gUHscGAMm9SdHR1dXd3dbW1t1/3Q2rqJiO0S6ECiRNM6MHY40L1ET+Iioq2PQeOVpggnCAanU3BbtBZtvFQpHIqPj49bLAGjMPHG4PIwOJENejhPZgJ6/qZv3DqyfHpeTkQ1B1fG1tbWP6wtLNQOnxpplAqFZU8m483m9RrTnEajSfA2RqFAOQ1jwnBDUyIqJDDj0IMX5BabJ7yC/4KcrO807Zqc8FFTbdJa8Am+REt7cUbnOz70JKAk1JQoirEYa5uK8kqlJpdKcXqjEWa7dcjjGR9EsxzI2o1GY782vuXmzUgr6XkhHLeD83fa3idLxuPfOWrUfwyhaGxtYWHhxHTBcmgkU1r2FgoHsv583imoTEpe6QqGosjbSN5Smgw/IUQlATp0iRI4NN+DOX8HgDMWKPE09xIKoh45Q3ko2HzSGDIJOUhZNobRwCASg2FsNpY6PuVCBuBUHMfZ/YEjbv8B7fi4dnBQ57cLp0+PGgLhU96N42TC4nDpwoP6O/5g4+Ml94e91qaojphm5b3FU9NjmwsfnTiaiY+UdH5cueD1Fv1ud15QRSJBwE5GfT6FKCVhArSYUMgkvTFUErhRhgIrDU4Cgw4NYJy/B8d7OJtJHyNCXoBKaoZ8TWSqT2ky8SzGj2LYGLxzSulyzVlVnNM5Oqp3Dh2xWLyFwJFAwD+syxqNKtOGURfeNzzlkPdKBuZHl8O6uRv/eCvrLfs8ToVE3oOoxaS+GjscDtdPLqx+sD6itXhLpfGCNmB357Mr5WwSoCbQYrJqi/Kk4GcoknDmKYhKiwrfayLMmqgLYSgp0NGjAYoOAUZlDkio7OgFKCZdUhJzaJCivJSJNoSclGpKlPVSNp7no5MazuDkIsjqRqdzIqDTHbBYdLpAYGbIopvQ6/VDyxkv8Tvcums4szXhuvnPyvCrH/SsWGOSZgHl+jIzfWpk5Oinq0A9Ot0oWSzjpQNebyBQ9KeQyHKzkYSSRHukb1NIzSI4iQwpnPqiIaUNyZaWQmNYsYh7h7wElgYSVMQ+ILppqpg3SUWIz2DnGpSU4S0W48Wigk35hwxWpQI9lcoKNQVOZeA29AbDkM5ypN+Ymhjq7/e7h49MzBzQZrYE6COXp2P6Q3Hd6E2tf2XHw/Met9LskKPNu4aPkVx87MOPV1cX1kfinkOQVRvwD9n97qzbwOHnc4JBEAQnZ5oSKXgsK5Wyfbwv5FPYAI5ES9MAMQMZIM18xFI9vRQmETIxZu6lYPMib+IZRoE9XVKmLwaPVPTFYrZJiJfV6foFk8va9E3EQJXBoAeo0T7U77cbnUa7YJ+Z6D+yNe1JTZIbHpjfsHjeNMBs/1pp8syTyxNKGl9EptlYObp+KhwOHz6x+tHqwsmxkfFBi+WAtpydsc8YAJgy2mfc+ZSBM/G8EngsMHne1hfU8Cx8iwjKMGBkcaAYYEPjHryCiDbyFrF5hck0GZ1EFc0yap4RoeZSdDKkErjTo+4Vb8C54XJZBUE153KZrHqnAcWL3mh3T6BzemZQ64lvDc/NOzAno5X98fiQ65rr/3JNtueZfcv2SccACUvHTe6t6cPhkufoydWPvlg9OTbtGddqvdmZmX6/3563TwDUycF6ESsSPPzVp1TbbLC3UJ9NwVAQDSqBUaQJbA8tMsQyoZ90KspSDB+1sQg9Skx2J6dEKatW8jaFK6I6bbVGOA61p123vGJHH1I6ubk56wZyyyj6Tr1BP6ofX3xv37CLlqP8NE+6v23man4TqcOwJu5201ZTbewmrtXERBOjyUYTD34cjN48ueu2lOk4ZYaPwQ4zwAyBikwFpsAUkIEQSiglYWELysfBAAn0X4DAob3XRJNNk91kNzXNbtyDz6wnvam7us+BFA6TeeZ5P573/U0aj5eHKbxQ/zdw/qO8z0XuOiHqzi7JDtL9OE3nR8XDw33oWsoHRJoL0GJGCF2XQgLajV76t77mUwXTJqlF7CYMGPyq2YDohaBXwREJrOsLoksgqhmuXTNEDAh2TacHXY1GTetEDaumLTJiJ6xWymR32ASCKqiM4hVDrEpZM6xFbVssNk8IQMxy+eZo4CGjO4i9XVKgvQFLanr2b7/6+lp+4C9Er0BV5y5PVPPBuJKIbSOCj48PiyfNUjpIBxiRPlAYVsWTtxGmzRTqhokk3SbCtPYlxF01gsPaV1h8rELHpVUeNsfwjRECrxqX179aNSBleT56bTe6usZ3IoUt1DToaDI5KJtVRYhYs6yqCjJHJ7ikSkHMJAuEcmWpnlBio0ZT6Dg3EHhReziulNXU4sI/2HlA1fcHfpPxygrg7LjBNQ12/Qb6zSGURc8BUKC465L/x+uutn3T7qAoN9gS1Lca/7Wd5A2GNRKugjd//eXSVaM5soQOiXhe0lIRdF+z2Rg1giJk3TQV3HbK5aLs36muLIEi6/K4LKpqS6LsCJkyI8rQk4WS5Vyungt4g/1S0EeA5srK5wa7p6LU1dTczDP/dOx99RNvABGsc3WudLZOz5r9tFdR8s1Gdx8xfHQ0QcrSSFkkrYdlXTASBbfjxg07SdoJogBLYSqYeY00kbzxK+3btaWrhoiZXzPZBBtkI2wOu9tNEQ49Sq2Ug9LTkNLrjQqmVo+fRaSGmJwkhdikBOTqcEIJb7rV3G5WPIXOCtYOu5oqehOhgjY3c/7fjL/PfxKnPSZEsI51jarmYzDRiqK0Rie9MajWSul0HJaTkblKNWOxWTO4P10RwUIQaH6qXQ9ot3kVHgBdhCc3zSmTzZO9cYMisi7K5LB6WNXkYP0sYpPIZlT9CVjabnJoRYtkBUlm6rkc2JbrdVoJ9vt73d7I5yp01jc2NpydIZqomCxoi1Og+e/wwmsVmnHZO+sPQzjqdp36BkhXOkAnvPPpSa3b7dYapThdmfcykiRyPkawWtDU/S4rG/pR9rtQPm44ENZbCOvU5hblGA4pq02XURBQV1lZFmzWkCiGrBaC9RAQ2WG1uVMFNSmKck4UaeUhvDFkzVGx1zyT2poTLK9cJVkOqdlOdaanHskJwjOvfphQqoLd8MXKxsqGc3nVlGUG+YHIMLkcl8i3GrVet7a9vVeK427SyFk5x3AB2SPgaXNAwCcLLjZzPYN2L/iljOCRRSYkeCQfHRAZzhs/8HEcrSRkwWL1eyiH3aGyhIlgMzJNiwwdDwZjsX7v6PD47rh1SpAd5w8bO5933DaJTpQthRR/6dwjW7tC1s8qtOwijdBVf5hRksj6q5VKRaznyrQ3kW/GYulSqV9q7G33cWPpoILpyedVREaPt6BygNH44GGGeQ8O8rE+VgLItL3t0vY2PmPBBJdQGMFiSYazalu1CN9brcmMVBflgBIrTY6K+7fHP52dDkHyhx/00mjlBnQ9OUx15l6+8PSj3cddvMxUEqJApaLr4Irlo4F0ZKuV/Lw3oaCpBnIw2koQJEul0t4eKJS28ZluxdLQuq/TSceCQf1p9PslfQZsjCa9RrPZapViCi1lQuWkVbVY4LQySYS+nMMFA3S+NOl1x4jXU0LTSW6sLPPDZDURyCXbbo2/tIDUfOR45txlmU4wgurmUYh1ss6o2ZQ9rQ7mW81+MIH5MFCvI6d8cNmtVqs5atRqEz2La7Uu3HJvMtnbq4F1GvLH8t7EgZfOhZLJMijCwSaFJJtMIlkRztBRl7oxOmmc+fRwBUk9KzWS8DABmkm2U5o2PfPCU48L5xcuC2GRCQuEWzMur2zoz3hXsxMeH6pwDSTS6XQsTofLophDw6O9Xm8wDWlB9qiIGg2A+3YwHo8raEsBjpHLkiSLVa4yGAzy8/PN0aQ2OcEjmTRGrTPoaN4FR13Jdd7uCnN0IJxUCxGdJUL2seL8uTdsGYbmquEsZY9Er2zobHeWDXZIW5lvNkcnk5OTxqiZbs3ng/AT8SCyd1I7OoLNONbx4M6d47uHD81ksTjudns9FNOjcXG/qP8yHndPRs2zStgyTEWduDZyMsqTFOthME1IupQd/qUpsHz8QL6+8hY6ebVaDWONQfLXIK2OHYi7ZTutnrUavW63uI8p4O7tu3fBDeTu3/pFx88/37t372cAf98C7t+/o+MBjOV+sdtoeSunMO+Rzq5zZwMcYfPdakYSob3EDklN4xdfnkVe/mfAPzCYRr/LhJFR+mQK77O0vL4cNUTIAuHyyIPWqFc8PL5z//4tEAS7mzdv/gr8BgC//qZ/uXnzHvjqXI9vF09GrTwXFnCllDliiPKrKbuDcPnD4booZVi1QGq8eXrqwv9w5I6F88WpVy6/LUhh2IRqOOzPCC6rjSCs2azgZ3yDIJYT432EKsg+VBJsARAE/lAVij5Ae2zMV5iklRq6U1ikptxDCs7Bj6tyTDhkwa88/+b0zOz/e9YOcZ+dPffOG59+LDOcz+fjdMYeD+YoKZcr5zB4oB4hccfF2wAC+cGtXx4gom+Pez1kcquFslQvZyztdntY2ILfdQmhcpip6hTbBTKlzU2/ODX7BLw68SeB333t8nuf6Wx9AA3LkAOkEIb0crkeCNTLMObe8TgeAOpivQ4XC9Tr5XA4XPXBaoVlWUrC2jsK7tTcNA7pkI9PLM6/cHHhnTc+eBtbZgk3zoQlvwSiMmhhDpEqrWBd/1KH7aM5McCApRTyePTdiNouuMm5RRzbXLzwBDP8a23WT8VeufT6W/YtilKRuzYCi0lMNx7WohsEFiaeUNsOcIPbn1t86bmZKbwb8URF6d9N4gsXF3AQeGl6cQ4HC5G5ubnFxcXp6ZcuPffyzNTCudkLj53d796cwKnxLttVAAAAAElFTkSuQmCC";
  isData = 0;
  pieChartOption: any; // 图表配置项
  playTime: any;
  currentIndex = -1; // 饼状图选中
  curTitle = ""; // 选中的表情类型
  curValue = ""; // 选中的表情数

  ngOnChanges(): void {
    if (this.chartOption && this.chartOption.length > 0) {
      this.isData = 1;
      this.chartOption.forEach(
        (item, index) => (item.itemStyle = { color: this.pieColors[index] })
      );
      this.getPie3D(this.chartOption, 0.55);
    } else {
      this.isData = 0;
    }
  }

  ngOnInit() {
    // //  修正取消高亮失败的 bug
    // // 监听 mouseover，近似实现高亮（放大）效果
    // this.myChart.on('mouseover', function (params) {
    //   // 准备重新渲染扇形所需的参数
    //   let isSelected;
    //   let isHovered;
    //   let startRatio;
    //   let endRatio;
    //   let k;
    //   let i;

    //   // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    //   if (hoveredIndex === params.seriesIndex) {
    //     return;

    //     // 否则进行高亮及必要的取消高亮操作
    //   } else {
    //     // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    //     if (hoveredIndex !== '') {
    //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
    //       isSelected = option.series[hoveredIndex].pieStatus.selected;
    //       isHovered = false;
    //       startRatio = option.series[hoveredIndex].pieData.startRatio;
    //       endRatio = option.series[hoveredIndex].pieData.endRatio;
    //       k = option.series[hoveredIndex].pieStatus.k;
    //       i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
    //       // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //       option.series[hoveredIndex].parametricEquation = getParametricEquation(
    //         startRatio,
    //         endRatio,
    //         isSelected,
    //         isHovered,
    //         k,
    //         i
    //       );
    //       option.series[hoveredIndex].pieStatus.hovered = isHovered;

    //       // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //       hoveredIndex = '';
    //     }

    //     // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    //     if (params.seriesName !== 'mouseoutSeries') {
    //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //       isSelected = option.series[params.seriesIndex].pieStatus.selected;
    //       isHovered = true;
    //       startRatio = option.series[params.seriesIndex].pieData.startRatio;
    //       endRatio = option.series[params.seriesIndex].pieData.endRatio;
    //       k = option.series[params.seriesIndex].pieStatus.k;

    //       // 对当前点击的扇形，执行高亮操作（对 option 更新）
    //       option.series[params.seriesIndex].parametricEquation = getParametricEquation(
    //         startRatio,
    //         endRatio,
    //         isSelected,
    //         isHovered,
    //         k,
    //         option.series[params.seriesIndex].pieData.value + 5
    //       );
    //       option.series[params.seriesIndex].pieStatus.hovered = isHovered;

    //       // 记录上次高亮的扇形对应的系列号 seriesIndex
    //       hoveredIndex = params.seriesIndex;
    //     }

    //     // 使用更新后的 option，渲染图表
    //     myChart.setOption(option);
    //   }
    // });

    // // 修正取消高亮失败的 bug
    // this.myChart.on('globalout', function () {
    //   if (hoveredIndex !== '') {
    //     // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //     isSelected = option.series[hoveredIndex].pieStatus.selected;
    //     isHovered = false;
    //     k = option.series[hoveredIndex].pieStatus.k;
    //     startRatio = option.series[hoveredIndex].pieData.startRatio;
    //     endRatio = option.series[hoveredIndex].pieData.endRatio;
    //     // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //     i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
    //     option.series[hoveredIndex].parametricEquation = getParametricEquation(
    //       startRatio,
    //       endRatio,
    //       isSelected,
    //       isHovered,
    //       k,
    //       i
    //     );
    //     option.series[hoveredIndex].pieStatus.hovered = isHovered;

    //     // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //     hoveredIndex = '';
    //   }

    //   // 使用更新后的 option，渲染图表
    //   myChart.setOption(option);
    // });
  }

  // 生成扇形的曲面参数方程
  getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;

    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      // eslint-disable-next-line no-param-reassign
      isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    // eslint-disable-next-line no-param-reassign
    k = k ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },

      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },

      x(u, v) {
        if (u < startRadian) {
          return (
            offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      y(u, v) {
        if (u < startRadian) {
          return (
            offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      z(u, v) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u) * h * 0.1;
        }
        // 当前图形的高度是Z根据h（每个value的值决定的）
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      },
    };
  }
  // 生成模拟 3D 饼图的配置项
  getPie3D(pieData, internalDiameterRatio) {
    const $this = this;
    const series = [];
    // 总和
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k = internalDiameterRatio
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;

      const seriesItem = {
        name: pieData[i].name ? pieData[i].name : `series${i}`,
        type: "surface", // 曲面图
        parametric: true, // 绘制3d曲面
        wireframe: {
          // 是否显示网格线
          show: false,
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k,
        },
        itemStyle: {},
        label: {
          normal: {
            show: false,
            position: 'center',
            // formatter: labelFormat,
            // rich: $this.labelRichOption
          },
          emphasis: {
            show: true
          }
        },
      };

      // 样式设置
      if (pieData[i].itemStyle) {
        const { itemStyle } = pieData[i];
        // 设置颜色
        pieData[i].itemStyle.color
          ? (itemStyle.color = pieData[i].itemStyle.color)
          : null;
        // 设置透明度
        pieData[i].itemStyle.opacity
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;
        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }
    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    console.log(series);
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = this.getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        // 我这里做了一个处理，使除了第一个之外的值都是10
        series[i].pieData.value === series[0].pieData.value ? 35 : 17
      );

      startValue = endValue;

      legendData.push(series[i].name);
    }

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    this.pieChartOption = {
      // animation: false,
      tooltip: {
        position: ['40%', Constants.countSize(1.7)],
        trigger: 'item',
        backgroundColor: "none",
        formatter: (params) => {
          if (params.seriesName !== "mouseoutSeries") {
            let per = (
              (this.pieChartOption.series[params.seriesIndex].pieData.value / sumValue) * 100
            ).toFixed(2);
            return `${per}%<br/>${params.seriesName}`;
          }
          return "";
        },
      },
      legend: {
        bottom: 5,
        left: Constants.countSize(2),
        right: Constants.countSize(2),
        icon: 'circle',
        itemWidth: 5,
        itemHeight: 5,
        textStyle: {
          color: '#B6C1CD',
          fontWeight: 300,
          fontSize: 12,
        },
        data: legendData
      },
      xAxis3D: {
        min: -1,
        max: 1,
      },
      yAxis3D: {
        min: -1,
        max: 1,
      },
      zAxis3D: {
        min: -1,
        max: 1,
      },
      grid3D: {
        show: false,
        boxHeight: 10,
        top: '-20%',
        left: "center",
        zlevel: 2,
        // environment: '#ff4',  // 环境贴图
        viewControl: {
          // 3d效果可以放大、旋转等，请自己去查看官方配置
          alpha: 25,  // 视角 控制水平角度
          // beta: 30,
          rotateSensitivity: 0, // 0无法旋转
          zoomSensitivity: 0, // 0无法缩放
          panSensitivity: 0,  // 0无法平移
          autoRotate: true, // 是否自动旋转
          distance: this.distance,  // 视距 控制大小
        },
        // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
        postEffect: {
          // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
          enable: false,
          bloom: {
            enable: true,
            bloomIntensity: 0.1,
          },
          devicePixelRatio: 2,
          SSAO: {
            enable: true,
            quality: "medium",
            radius: 2,
          },
          // temporalSuperSampling: {
          //   enable: true,
          // },
        },
      },
      series,
      // graphic: [
      //   {
      //     type: "image", // 图形元素类型
      //     top: Constants.countSize(3), // 根据父元素进行定位 （居中）
      //     left: 'center',
      //     zlevel: 1,
      //     style: {
      //       image: $this.base64ImageBg, // base64背景图
      //       width: Constants.countSize(12),
      //       height: Constants.countSize(6),
      //     },
      //   },
      // ],
    };
  }
  // 取消轮播
  changePlay() {
    clearInterval(this.playTime);
    let dom = echarts.init(this.el.nativeElement.querySelector("#chartType"));
    // 取消之前高亮的图形
    dom.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: this.currentIndex,
    });
  }
  openPlay() {
    this.playPieCur();
  }
  // 轮播动画
  playPieCur() {
    clearInterval(this.playTime);
    let dom = echarts.init(this.el.nativeElement.querySelector("#chartType"));
    this.playTime = setInterval(() => {
      let dataLen = this.pieChartOption.series[0].pieData.length;
      // 取消之前高亮的图形
      dom.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: this.currentIndex,
      });
      this.currentIndex = (this.currentIndex + 1) % dataLen;
      // 高亮当前图形
      dom.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.currentIndex,
      });
      // 显示 tooltip
      dom.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.currentIndex,
      });

      this.chartOption.forEach((item, index) => {
        if (index == this.currentIndex) {
          this.curTitle = item.name;
          this.curValue = item.value;
        }
      });
      // console.log(this.currentIndex)
    }, 1000);
  }
}
