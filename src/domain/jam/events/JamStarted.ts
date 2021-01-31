import DomainEventInterface from '@main/domain/common/domainEventInterface';
import Jam from '../jam';

export default class JamStarted implements DomainEventInterface {
  created: Date;

  name: 'JamStarted';

  data: Jam;
}
