describe("Game Controller Test", function () {

  describe("in the isGameEnd function", function () {

    it("should return true if a player meet require game move", function () {
      expect(gameController.isGameEnd([4, 5, 6], gameModel.wining_positions))
        .toBe(true);

      expect(gameController.isGameEnd([6, 7, 8, 9], gameModel.wining_positions))
        .toBe(true);

      expect(gameController.isGameEnd([1, 2, 4,3], gameModel.wining_positions))
        .toBe(true);

      expect(gameController.isGameEnd([4, 7, 5, 8, 6, 9], gameModel.wining_positions))
        .toBe(true);
    });

    it("should return false if a player does not meet require game move", function () {
      expect(gameController.isGameEnd([4, 5], gameModel.wining_positions))
        .toBe(false);

      expect(gameController.isGameEnd([6, 8, 9], gameModel.wining_positions))
        .toBe(false);

      expect(gameController.isGameEnd([1, 2, 4], gameModel.wining_positions))
        .toBe(false);

      expect(gameController.isGameEnd([4, 7, 1, 8, 6], gameModel.wining_positions))
        .toBe(false);
    });   
  });

});