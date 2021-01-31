import DomainEventInterface from '@main/domain/common/domainEventInterface';
import Jam from '../jam';

export default class JamCreated implements DomainEventInterface {
  created: Date;

  name: 'JamCreated';

  data: Jam;
}
