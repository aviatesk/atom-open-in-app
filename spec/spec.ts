import { expect } from "chai";
import { join } from "path";

const packagePath = join(__dirname, "..");

describe("open-in-app", function() {
  this.timeout(10000);
  beforeEach(async () => {
    await atom.packages.activatePackage(packagePath);
  });

  describe("when the package is activated", () => {
    it("should be activated", () => {
      expect(atom.packages.isPackageActive("open-in-app")).to.equal(true);
    });
  });

  describe("when the package is deactivated", () => {
    it("should be deactivated", async () => {
      await atom.packages.deactivatePackage("open-in-app");
      expect(atom.packages.isPackageActive("open-in-app")).to.equal(false);
    });
  });
});
