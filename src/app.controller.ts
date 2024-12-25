import { Controller, Get } from '@nestjs/common';
import FixtureCreate from './fixtures/create.fixtures';

@Controller('app')
export class AppController {

    constructor(
        private fixturesCreate: FixtureCreate
    ) {}

    @Get(`start/permit`)
    public async startPermit () {
        this.fixturesCreate.permitFix();
    }

    @Get(`start/user`)
    public async startUser () {
        this.fixturesCreate.userFix();
    }

    @Get(`start/regional`)
    public async startRegional () {
        this.fixturesCreate.regionalFix();
    }

    @Get(`start/payment`)
    public async startPayment () {
        this.fixturesCreate.paymentFix();
    }

    @Get(`start/unity`)
    public async startUnity () {
        this.fixturesCreate.unityFix();
    }

    @Get(`start/subscription`)
    public async startSubscription () {
        this.fixturesCreate.subscriptionFix();
    }

}
