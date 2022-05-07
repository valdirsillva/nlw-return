import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    private feedbacksRepository: FeedbacksRepository;
    private mailAdapter: MailAdapter;

    constructor( feedbacksRepository: FeedbacksRepository, mailAdapter: MailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const {  type, comment, screenshot} = request;

        await this.feedbacksRepository.create({
           type,
           comment,
           screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family sans-serif. font-size:16px; color: #222;">`,
                `<p> Tipo do feedback: ${type} </p>`,
                `<p> Comentário: ${comment} </p>`,
                `</div>`
            ].join('\n')
        })
    }
}