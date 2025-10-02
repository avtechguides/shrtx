#!/bin/bash

# Create directory structure
mkdir -p src/components/google

# Write AdSense component
cat > src/components/google/AdSense.astro << 'EOF'
---
export interface Props {
  clientId: string;        // Your AdSense client ID (e.g., "ca-pub-xxxxxxxxxxxxx")
  slotId: string;          // Ad unit slot ID
  format?: string;         // Optional: ad format, default is "auto"
  style?: string;          // Optional: inline CSS style for the ad container
}

const { clientId, slotId, format = "auto", style = "display:block" } = Astro.props as Props;
---

<script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`} crossorigin="anonymous"></script>

<ins class="adsbygoogle"
  style={style}
  data-ad-client={clientId}
  data-ad-slot={slotId}
  data-ad-format={format}
  data-full-width-responsive="true">
</ins>

<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOF

echo "Created src/components/google/AdSense.astro"

# Write Google Analytics component
cat > src/components/google/GoogleAnalytics.astro << 'EOF'
---
export interface Props {
  trackingId: string;     // Your GA tracking ID (e.g., "G-XXXXXXXXXX")
}

const { trackingId } = Astro.props as Props;
---

<script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{trackingId}}', { 'send_page_view': true });
</script>
EOF

echo "Created src/components/google/GoogleAnalytics.astro"

echo "All Google components created successfully in src/components/google/"
