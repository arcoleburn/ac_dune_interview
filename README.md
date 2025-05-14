
## Setup Instructions

### Env 
create a `.env.local` file. 

You'll need to add two variables: 
```
COIN_CAP_API_TOKEN= < your api key here>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
### Start Up 
Run `npm run dev`, should be good!

## Deployed Application 
To view this app live in production, please visit: https://ac-dune-interview.vercel.app/

## Architecture / Approach 
I strive for simplicity, extensibility, and ease of understanding/navigation for furture devlopers, to minimize risk and maximize development speed. 

I use what I call a "Fractal Modlet" architecture. You could also call it "Domain Driven Organization". The idea is that each folder, each "modlet" is its own little black box. It contains everything related to it that it needs. Helper functions, components, images, etc, are all there. The component itself is the only thing exported from the index. Especially with path aliases, this makes imports cleaner and easier to read, and also helps guard against importing things the "wrong way". Whats the wrong way? Each modlet is only allowed to import from a Child modlet, or from the "shared" folder of a parent modlet (or a global shared folder). This helps keep things organized and easier to work on with confidence; you don't need to worry that changing a function in one piece of the app will impact something in an unrelated area. You're safe in the black box of the modlet, as long as the rules are followed. 

I also endeavor to keep the pages themselves as simple as possible, in most cases, simply rendereing a "Scene" and passing it any data it needs. 


#### Wait a second... Didn't we tell him to use Redux? 
Excellent question, you're right. But I'm not a "blindly follow requirements" type of developer. And the thing is, we __barely have any state__. I tried to keep as much as possible SSRd, and so the only component that has any client side state is the live price card component. Generally, I'm an advocate of a federated state apporach as opposed to a centralized one, like you get with Redux. Centralized state really easily becomes like your kitchen junk drawer... you throw everything in it that doesnt have a place until you have to eventually dump everything out and organize it properly.  

Happy to revise and resubmit with a little redux flair 😉

### Requirements Overview: 

Next w/ TS ✅ 
Tailwind Styles ✅
SSR ✅
Public API Integration ✅
HomePage showing 20 cryptocurrencies by market cap: ✅
Coin detail page showing realtime updates and metadata: ✅
Real time price ticker ✅ (tried to get a chart going as well, but hit some trouble with the CoinCap history endpt and ran out of time)
Simulated SSE ✅
Responsive Design: ✅ (decided to move from table to stacked cards for mobile users. tables on mobile... yuck)
Deployment ✅

#### Bonuses: 
Sorting by Price, Volume, or Change% ✅ 
Unit Tests for at least one component ✅ (exactly one... but also wrote tests for a helper function)