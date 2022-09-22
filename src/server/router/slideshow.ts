import { createRouter } from "./context";
import axios from "axios";

export const slideshowRouter = createRouter().query("getSlides", {
  async resolve() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/slideshow?collection=${randomCollection()}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});

const BASE_URL = "https://app.stargaze.zone";

const collections = [
  "stars1tzntdhpvlh2dh62wdv4waerd8y9s5sl4n6wj2ejm07gn6yht9nrsx5h40n", // Star Equinox
  "stars10v8m3lglw4vat5g3w4xj7ven7puxudnqkjwwaf9nh3alukxpmh3qm4wzwh", // Alpha Centaurians
  "stars10v8m3lglw4vat5g3w4xj7ven7puxudnqkjwwaf9nh3alukxpmh3qm4wzwh", // Alpha Centaurians
  "stars15pqspe0lcyeztwmk232vkwqgpklku5t74du00827l44p4vxnal7qvevcuw", // 114Shut
  "stars1l33upjvf6amlkx90qc2re2007cgmhgn8fk3lahunv55efasy4vvs95emdl", // Stargaze Citizens
  "stars1l33upjvf6amlkx90qc2re2007cgmhgn8fk3lahunv55efasy4vvs95emdl", // Stargaze Citizens
  "stars1l33upjvf6amlkx90qc2re2007cgmhgn8fk3lahunv55efasy4vvs95emdl", // Stargaze Citizens
  "stars1k0anackr8h5l5aefm3czs3f8n8mlqgrz53yrmumlmqxmn6xdk5uq5a3wmh", // Starstudents
  "stars1k0anackr8h5l5aefm3czs3f8n8mlqgrz53yrmumlmqxmn6xdk5uq5a3wmh", // Starstudents
  "stars1k0anackr8h5l5aefm3czs3f8n8mlqgrz53yrmumlmqxmn6xdk5uq5a3wmh", // Starstudents
  "stars1fmz5sefkdcmdad9jtndf6v9ugy7dr9sx2jys8a8wg2mxa3lr4llsdlx64p", // Starchoadz
  "stars1fmz5sefkdcmdad9jtndf6v9ugy7dr9sx2jys8a8wg2mxa3lr4llsdlx64p", // Starchoadz
  "stars1lvhdnjcq05czd38hy25fzk80cn03hhxens4e2am9468rmpzc82ms6l0k6h", // Babychoadz
  "stars17s7emulfygjuk0xn906athk5e5efsdtumsat5n2nad7mtrg4xres3ysf3p", // Stargaze Punks
  "stars17s7emulfygjuk0xn906athk5e5efsdtumsat5n2nad7mtrg4xres3ysf3p", // Stargaze Punks
  "stars1n08lr7w2tkpd8m79hmt3ex7076awk77qysdzlg70a35agwzznwzqwgfq0j", // Women from Cosmos I
  "stars129fydvny3e6a5wnjwwnus3st2jumxnrwkshayj4v0u5k872svueqytelsx", // Women from Cosmos II
  "stars1ltd0maxmte3xf4zshta9j5djrq9cl692ctsp9u5q0p9wss0f5lmsvd9ukk", // IBC Frens I
  "stars1fvw54y5r0l065zn20372sfdtmx0wzygjhlwqz87y3lg6epaqfcfqjlm0qy", // IBC Frens II
  "stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420", // Bad Kids
  "stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420", // Bad Kids
  "stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420", // Bad Kids
  "stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420", // Bad Kids
];

function randomCollection() {
  return collections[Math.floor(Math.random() * collections.length)];
}
