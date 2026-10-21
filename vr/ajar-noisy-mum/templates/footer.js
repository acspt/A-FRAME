import { html } from "lighterhtml";
import settings from "../settings.json";

export const renderFooter = html.node`<footer class="footer">
  <div class="tagline">
    <b>Glitch in Bio</b><br />
    Your links, your way.
  </div>
  <a
    class="btn--remix"
    target="_top"
    href="https://glitch.com/edit/#!/remix/glitch-in-bio"
  >
    <img
      src="assets/Logo_Color.svg"
      alt=""
    />
    Get your own free page
  </a>
</footer>
`;
