<script lang="ts">
  import Icon from '@/components/Icon';
  import { Item } from 'kustom';
  import { kustomService } from '@/services';

  import { entries } from './entries';
  import { dialogStore } from '@/stores';

  function onButtonClick(type: Item['internal_type']) {
    kustomService.createItemOfType(type);

    dialogStore.hide();
  }
</script>

<p class="card__title">Add a new Item</p>
<div class="card__content">
  <div class="grid">
    {#each entries as entry}
      <div class="btn" on:click={() => onButtonClick(entry.type)}>
        <Icon icon={entry.icon} />
        <div class="info">
          <h5 class="info__title">{entry.title}</h5>
          <span class="info__description is-size-7">
            {entry.description}
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .grid {
    display: grid;
    width: 480px;
    gap: size(gap);
    grid-template-columns: repeat(2, 1fr);
  }

  .btn {
    display: flex;
    align-items: center;
    gap: size(gap);

    &:hover {
      .info__description {
        color: themed(text, color);
      }
    }
  }

  .info {
    display: flex;
    flex: 1;
    flex-direction: column;

    &__description {
      color: themed(text, color--blur);
      transition: color transition(time);
    }

    &__title {
      margin: 0;
      font-weight: 600;
    }
  }
</style>
