import { FeedbacksRepository, FeedbackCreateData } from "../feedbacks-repository";
import { prisma } from '../../prisma';

export class PrismaFeedbackRepository implements FeedbacksRepository {

    async create({ type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
              type: type,
              comment: comment,
              screenshot: screenshot,  
            }
        })
    }    
}