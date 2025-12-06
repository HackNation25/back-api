export class Choice {
  constructor(
    public readonly category_id: string,
    public readonly choice: string,
  ) {}
}

export class UserProfileDomain {
  constructor(
    public readonly uuid: string,
    public readonly choices: Choice[],
  ) {}
}
