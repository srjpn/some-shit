const { getAvailabilities } = require("./index.js");

describe("getAvailabilities", () => {
  it("should return empty list on no data", () => {
    const numberOfDays = 7; // can not modify due to total days in week are 7
    const availabilities = getAvailabilities(
      [],
      new Date("2014-08-10")
    );
    expect(availabilities.length).toBe(numberOfDays);
    for (let i = 0; i < numberOfDays; ++i) {
      expect(availabilities[i].slots).toEqual([]);
    }
  });

  it.skip("should return empty list on number of days is more than 7", () => {
    const availabilities = getAvailabilities(
      [],
      new Date("2014-08-10")
    );
    expect(availabilities.length).toBe(0);
  });
  // '11/08/2014, 15:00:00'
  it("should return shots for a single day with appointment", () => {
    const events = [
      {
        kind: "opening",
        starts_at: new Date("08/11/2014, 09:30:00"),
        ends_at: new Date("08/11/2014, 12:30:00"),
      },
      {
        kind: "appointment",
        starts_at: new Date("08/11/2014, 10:30:00"),
        ends_at: new Date("08/11/2014, 11:30:00"),
      },
    ];
    const availabilities = getAvailabilities(events, new Date("08/10/2014"));

    expect(String(availabilities[0].date)).toBe(String(new Date("08/10/2014")));
    expect(availabilities[0].slots).toEqual([]);

    expect(String(availabilities[1].date)).toBe(String(new Date("08/11/2014")));
    console.log(availabilities);
    expect(availabilities[1].slots).toEqual([
      "9:30",
      "10:00",
      "11:30",
      "12:00",
    ]);

    expect(String(availabilities[6].date)).toBe(String(new Date("2014-08-16")));
  });

  describe("case 4", () => {
    beforeEach(() => {
      knex("events").insert([
        {
          kind: "appointment",
          starts_at: new Date("2014-08-11 10:30"),
          ends_at: new Date("2014-08-11 11:30"),
        },
        {
          kind: "opening",
          starts_at: new Date("2018-08-04 09:30"),
          ends_at: new Date("2018-08-04 12:30"),
          weekly_recurring: true,
        },
      ]);
    });

    it("test 1", () => {
      const numberOfDays = 7; // can not modify due to total days in week are 7
      const availabilities = getAvailabilities(
        new Date("2014-08-10"),
        numberOfDays
      );
      expect(availabilities.length).toBe(numberOfDays);

      expect(String(availabilities[0].date)).toBe(
        String(new Date("2014-08-10"))
      );
      expect(availabilities[0].slots).toEqual([]);

      expect(String(availabilities[1].date)).toBe(
        String(new Date("2014-08-11"))
      );
      expect(availabilities[6].slots).toEqual([]);
    });
  });

  describe("case 5", () => {
    beforeEach(() => {
      knex("events").insert([
        {
          kind: "appointment",
          starts_at: new Date("2014-08-11 10:30"),
          ends_at: new Date("2014-08-11 11:30"),
        },
        {
          kind: "opening",
          starts_at: new Date("2018-08-04 09:30"),
          ends_at: new Date("2018-08-04 12:30"),
          weekly_recurring: true,
        },
      ]);
    });

    it("test 1", () => {
      const numberOfDays = 7; // can not modify due to total days in week are 7
      const availabilities = getAvailabilities(
        new Date("2014-08-10"),
        numberOfDays
      );
      expect(availabilities.length).toBe(numberOfDays);

      expect(String(availabilities[0].date)).toBe(
        String(new Date("2014-08-10"))
      );
      expect(availabilities[0].slots).toEqual([]);

      expect(String(availabilities[1].date)).toBe(
        String(new Date("2014-08-11"))
      );
      expect(availabilities[6].slots).toEqual([]);
    });
  });

  describe("case 6", () => {
    beforeEach(() => {
      knex("events").insert([
        {
          kind: "appointment",
          starts_at: new Date("2018-08-11 10:30"),
          ends_at: new Date("2018-08-11 12:30"),
        },
        {
          kind: "opening",
          starts_at: new Date("2018-08-04 09:30"),
          ends_at: new Date("2018-08-04 12:30"),
          weekly_recurring: true,
        },
      ]);
    });

    it("test 1", () => {
      const numberOfDays = 7; // can not modify due to total days in week are 7
      const availabilities = getAvailabilities(
        new Date("2018-08-10"),
        numberOfDays
      );
      expect(availabilities.length).toBe(numberOfDays);

      expect(String(availabilities[0].date)).toBe(
        String(new Date("2018-08-10"))
      );
      expect(availabilities[0].slots).toEqual([]);

      expect(String(availabilities[1].date)).toBe(
        String(new Date("2018-08-11"))
      );
      expect(availabilities[1].slots).toEqual(["9:30", "10:00"]);

      expect(String(availabilities[6].date)).toBe(
        String(new Date("2018-08-16"))
      );
    });
  });
});
