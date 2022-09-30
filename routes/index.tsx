import { tw } from "twind";
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts"

const url:string = "https://www.gaitameonline.com/rateaj/getrate";


export interface Price {
  high: string
  open: string
  bid: string
  currencyPairCode: string
  ask: string
  low: string
}

export const handler: Handlers<Price | null> = {
	async GET(_, ctx){
		const resp = await fetch(url);
		if (resp.status === 200){
			const data = await resp.json();
			const price:Price = data.quotes
			.filter((obj) => {
					return obj.currencyPairCode === "USDJPY"
				});
			return ctx.render(price[0]);
		}
		return ctx.render(null);
	}
}

export default function Home({data} : PageProps<Price|null>) {
	if (!data){
		return <h1>Data is not available</h1>
	}
  return (
    <div class={tw`w-screen h-screen bg-gray-900`}>
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/dollar_yen.svg"
				width="200px"
				class="mx-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-10 text(center 3xl white)">
			  ドル円為替チェッカー
      </p>
			<p class={tw`my-10 text(center 2xl white)`}>
			  日本円からドル: {data.open}円
			</p>
    </div>
		</div>
  );
}
