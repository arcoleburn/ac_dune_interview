import { render, screen } from "@testing-library/react";
import CoinCard from "./CoinCard";
import { Coin } from "@/shared/types";

const mockCoin: Coin = {
  id: "bitcoin",
  rank: "1",
  symbol: "BTC",
  name: "Bitcoin",
  marketCapUsd: "2000000000",
  volumeUsd24Hr: "50000000",
  priceUsd: "57435.28",
  changePercent24Hr: "2.45",
};

describe("CoinCard", () => {
  it("renders coin name and symbol", () => {
    render(<CoinCard coin={mockCoin} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("displays formatted price", () => {
    render(<CoinCard coin={mockCoin} />);
    expect(screen.getByText("$57,435.28")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("shows change percentage with + sign and green color", () => {
    render(<CoinCard coin={mockCoin} />);
    const changeEl = screen.getByText("+2.45%");
    expect(changeEl).toBeInTheDocument();
    expect(changeEl).toHaveClass("text-green-600");
  });
});
