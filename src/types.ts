export interface BingResponse {
  images: Array<{
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    title: string;
    hsh: string;
  }>;
}
