import { Controller, Get } from '@nestjs/common';
import FixtureCreate from './fixtures/create.fixtures';

@Controller('app')
export class AppController {

    constructor(
        private fixturesCreate: FixtureCreate
    ) {}

    @Get(`start/permit`)
    public async startPermit () {
	console.log(`permit`)
        this.fixturesCreate.permitFix();
    }

    @Get(`start/user`)
    public async startUser () {
	console.log(`user`)
        this.fixturesCreate.userFix();
    }

    @Get(`start/regional`)
    public async startRegional () {
	console.log(`regional`)        
this.fixturesCreate.regionalFix();
    }

    @Get(`start/payment`)
    public async startPayment () {
	console.log(`payment`)        
this.fixturesCreate.paymentFix();
    }

    @Get(`start/unity`)
    public async startUnity () {
	console.log(`unity`)        
this.fixturesCreate.unityFix();
    }

    @Get(`start/subscription`)
    public async startSubscription () {
	console.log(`subcription`)        
this.fixturesCreate.subscriptionFix();
    }

}
