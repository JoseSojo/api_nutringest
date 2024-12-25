import FixtureCreate from './fixtures/create.fixtures';
export declare class AppController {
    private fixturesCreate;
    constructor(fixturesCreate: FixtureCreate);
    startPermit(): Promise<void>;
    startUser(): Promise<void>;
    startRegional(): Promise<void>;
    startPayment(): Promise<void>;
    startUnity(): Promise<void>;
    startSubscription(): Promise<void>;
}
