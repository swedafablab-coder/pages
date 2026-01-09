declare module "luminous-lightbox" {
  export class Luminous {
    constructor(
      element: HTMLElement,
      options?: Record<string, unknown>
    );
  }

  export class LuminousGallery {
    constructor(
      elements: NodeListOf<HTMLElement> | HTMLElement[],
      options?: Record<string, unknown>,
      luminousOpts?: Record<string, unknown>
    );
  }
}