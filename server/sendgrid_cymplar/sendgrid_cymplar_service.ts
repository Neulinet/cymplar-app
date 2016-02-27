import * as sendgrid from 'sendgrid';
import {ObjectUtil} from '../../client/core/util';


export class SendGridCymplarService {
	
	private sendgridServ: Sendgrid.Instance;
	
	constructor() {
		if (ObjectUtil.isBlank(this.sendgridServ)) {
			this.sendgridServ = sendgrid(process.env.CYMPLAR_SENDGRID_USER, process.env.CYMPLAR_SENDGRID_PASSWORD);	
		}
	}
	
	sendEmail(email: any): Promise<any> {
		return new Promise<any>((fulfill: Function, reject: Function) => {
			this.sendgridServ.send(email, (err, json) => {
				if (err) { 
					console.error(err); 
					reject(err);
					return; 
				}
				fulfill(json); 
			});
		});
	}
}


export const sendGridCymplarService = new SendGridCymplarService();
