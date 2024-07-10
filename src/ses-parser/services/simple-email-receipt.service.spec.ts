import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { SesRecordsDto } from '../dtos/input/ses-records.dto';
import { SimpleEmailReceiptService } from './simple-email-receipt.service';

describe('SimpleEmailReceiptService', () => {
  let service: SimpleEmailReceiptService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SimpleEmailReceiptService],
    }).compile();

    service = moduleRef.get<SimpleEmailReceiptService>(
      SimpleEmailReceiptService,
    );
  });

  it('should be defined', () => {
    expect.assertions(1);

    //Assert
    expect(service).toBeDefined();
  });

  describe('parseSesEvents', () => {
    const source = faker.internet.email();
    const destination = [faker.internet.email(), faker.internet.email()];

    it('should return an array of HumanizedSesDto when is not delayed and all veredicts are true', () => {
      expect.assertions(2);

      //Arrange
      const delay = faker.number.int({ min: 0, max: 1000 });

      const sesRecordsMock = {
        Records: [
          {
            eventSource: 'aws:ses',
            ses: {
              receipt: {
                spamVerdict: {
                  status: 'PASS',
                },
                virusVerdict: {
                  status: 'PASS',
                },
                spfVerdict: {
                  status: 'PASS',
                },
                dkimVerdict: {
                  status: 'PASS',
                },
                dmarcVerdict: {
                  status: 'PASS',
                },
                processingTimeMillis: delay,
              },
              mail: {
                source,
                timestamp: faker.date.recent().toISOString(),
                destination,
              },
            },
          },
        ],
      };

      //Act

      const result = service.parseSesEvents(
        sesRecordsMock as unknown as SesRecordsDto,
      );

      //Assert
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            spam: true,
            virus: true,
            dns: true,
            mes: expect.any(String),
            retrasado: false,
            emisor: source.split('@')[0],
            receptor: expect.arrayContaining([
              destination[0].split('@')[0],
              destination[1].split('@')[0],
            ]),
          }),
        ]),
      );
      expect(result).toHaveLength(1);
    });

    it('should return an array of HumanizedSesDto when is delayed and spf veridict is true and the other ones are true', () => {
      expect.assertions(2);

      //Arrange
      const delay = faker.number.int({ min: 1001, max: 2000 });

      const sesRecordsMock = {
        Records: [
          {
            eventSource: 'aws:ses',
            ses: {
              receipt: {
                spamVerdict: {
                  status: 'PASS',
                },
                virusVerdict: {
                  status: 'PASS',
                },
                spfVerdict: {
                  status: 'FAIL',
                },
                dkimVerdict: {
                  status: 'PASS',
                },
                dmarcVerdict: {
                  status: 'PASS',
                },
                processingTimeMillis: delay,
              },
              mail: {
                source,
                timestamp: faker.date.recent().toISOString(),
                destination,
              },
            },
          },
        ],
      };

      //Act

      const result = service.parseSesEvents(
        sesRecordsMock as unknown as SesRecordsDto,
      );

      //Assert
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            spam: true,
            virus: true,
            dns: false,
            mes: expect.any(String),
            retrasado: true,
            emisor: source.split('@')[0],
            receptor: expect.arrayContaining([
              destination[0].split('@')[0],
              destination[1].split('@')[0],
            ]),
          }),
        ]),
      );
      expect(result).toHaveLength(1);
    });
  });
});
