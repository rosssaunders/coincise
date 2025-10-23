use crate::types::{EngineEvent, SequencedEngineEvent};
use std::fmt;
use std::sync::{
    atomic::{AtomicU64, Ordering},
    Arc,
};
use tokio::sync::broadcast::{self, Receiver};
use tracing::trace;

#[derive(Clone)]
pub struct EventBroadcaster {
    inner: Arc<EventBroadcasterInner>,
}

struct EventBroadcasterInner {
    sequence: AtomicU64,
    sender: broadcast::Sender<SequencedEngineEvent>,
}

impl EventBroadcaster {
    pub fn with_capacity(capacity: usize) -> Self {
        let (sender, _) = broadcast::channel(capacity);
        Self {
            inner: Arc::new(EventBroadcasterInner {
                sequence: AtomicU64::new(1),
                sender,
            }),
        }
    }

    pub fn subscribe(&self) -> Receiver<SequencedEngineEvent> {
        self.inner.sender.subscribe()
    }

    pub fn emit(&self, event: EngineEvent) {
        let sequence = self.inner.sequence.fetch_add(1, Ordering::Relaxed);
        let message = SequencedEngineEvent { sequence, event };
        if let Err(error) = self.inner.sender.send(message) {
            trace!(?error, "failed to broadcast event");
        }
    }

    pub fn receiver_count(&self) -> usize {
        self.inner.sender.receiver_count()
    }
}

impl fmt::Debug for EventBroadcaster {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("EventBroadcaster")
            .field("sequence", &self.inner.sequence.load(Ordering::Relaxed))
            .field("receivers", &self.receiver_count())
            .finish()
    }
}

impl Default for EventBroadcaster {
    fn default() -> Self {
        Self::with_capacity(1024)
    }
}
