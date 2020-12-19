const GTM_ID = "GTM-MBT7H2P";

interface PageEvent {
  event: string;
  page: string;
}

interface PageEventProps {
  event: string;
  page: string;
}

declare global {
  interface Window {
    dataLayer: {
      push: (pageEvent: PageEventProps) => PageEvent;
    };
  }
}

const GTMPageView = (url: string): PageEventProps => {
  const pageEvent: PageEventProps = {
    event: "pageview",
    page: url,
  };

  window && window.dataLayer && window.dataLayer.push(pageEvent);
  return pageEvent;
};

export { GTM_ID, GTMPageView };
